import pytest
from app import app, FEATURE_NAMES


@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


def valid_payload():
    payload = {f: 0 for f in FEATURE_NAMES}
    payload['Age_Mons'] = 24
    return payload


def test_health(client):
    resp = client.get('/health')
    assert resp.status_code == 200
    assert resp.get_json()['status'] == 'Spectra ML service is running'


def test_predict_returns_expected_shape(client):
    resp = client.post('/predict', json=valid_payload())
    assert resp.status_code == 200
    body = resp.get_json()
    assert body['risk_band'] in ('Low', 'Medium', 'High')
    assert 0.0 <= body['confidence'] <= 1.0
    assert len(body['explanations']) == 3
    for exp in body['explanations']:
        assert exp['direction'] in ('increases', 'decreases')


def test_predict_high_risk_answers_yield_high_band(client):
    payload = {f: 1 for f in FEATURE_NAMES}
    payload['Age_Mons'] = 30
    resp = client.post('/predict', json=payload)
    assert resp.status_code == 200
    assert resp.get_json()['risk_band'] == 'High'


def test_predict_missing_fields_returns_400(client):
    resp = client.post('/predict', json={'A1': 0})
    assert resp.status_code == 400
    assert 'Missing required fields' in resp.get_json()['message']


def test_predict_non_numeric_field_returns_400(client):
    payload = valid_payload()
    payload['A1'] = 'yes'
    resp = client.post('/predict', json=payload)
    assert resp.status_code == 400


def test_predict_non_json_body_returns_400(client):
    resp = client.post('/predict', data='not json', content_type='text/plain')
    assert resp.status_code == 400
