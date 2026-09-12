import os
from flask import Flask, request, jsonify
import joblib
import pandas as pd
import shap

app = Flask(__name__)

# resolve artifacts relative to this file so the service works regardless
# of the working directory it's launched from (python app.py vs gunicorn)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model = joblib.load(os.path.join(BASE_DIR, 'spectra_model.pkl'))

# rebuilt from the model rather than unpickled: the serialized explainer
# embeds numba-compiled code objects that only load on the Python version
# that wrote them. Reconstructing is instant and yields identical SHAP values.
explainer = shap.TreeExplainer(model)

FEATURE_NAMES = model.feature_names_in_.tolist()

FEATURE_EXPLANATIONS = {
    'A1': 'Does not look when name is called',
    'A2': 'Difficulty making eye contact',
    'A3': 'Does not point to show interest',
    'A4': 'Does not respond to smiling',
    'A5': 'Does not imitate actions',
    'A6': 'Does not notice when others are hurt',
    'A7': 'Unusual response to sounds',
    'A8': 'Repetitive behaviors like spinning or flapping',
    'A9': 'Limited facial expressions',
    'A10': 'Difficulty with back and forth interaction',
    'Age_Mons': 'Age in months',
    'Sex': 'Sex of child',
    'Jaundice': 'History of jaundice',
    'Family_mem_with_ASD': 'Family history of ASD'
}

def get_risk_band(probability):
    if probability < 0.35:
        return 'Low'
    elif probability < 0.70:
        return 'Medium'
    else:
        return 'High'

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"message": "Request body must be a JSON object"}), 400

    missing = [f for f in FEATURE_NAMES if f not in data]
    if missing:
        return jsonify({"message": f"Missing required fields: {', '.join(missing)}"}), 400

    try:
        input_df = pd.DataFrame([data])
        input_df = input_df[FEATURE_NAMES].astype(float)
    except (ValueError, TypeError):
        return jsonify({"message": "All fields must be numeric"}), 400

    prob = model.predict_proba(input_df)[0][1]
    risk_band = get_risk_band(prob)

    shap_vals = explainer.shap_values(input_df)[0]

    top_features = sorted(
        zip(FEATURE_NAMES, shap_vals),
        key=lambda x: abs(x[1]),
        reverse=True
    )[:3]

    explanations = [
        {
            "feature": f,
            "explanation": FEATURE_EXPLANATIONS.get(f, f),
            "impact": round(float(v), 3),
            "direction": "increases" if v > 0 else "decreases"
        }
        for f, v in top_features
    ]

    return jsonify({
        "risk_band": risk_band,
        "confidence": round(float(prob), 3),
        "disclaimer": "This is not a clinical diagnosis.",
        "explanations": explanations
    })

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "Spectra ML service is running"})

if __name__ == '__main__':
    debug_mode = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    app.run(debug=debug_mode, port=int(os.environ.get('PORT', 5001)))
