from app import db
from app.models.detection import Detection

def save_detection_results(filename, detections):
    for detection in detections:
        db.session.add(Detection(
            filename=filename,
            x1=detection['x1'],
            y1=detection['y1'],
            x2=detection['x2'],
            y2=detection['y2'],
            confidence=detection['confidence']
        ))
    db.session.commit()

def get_detection_results(filename):
    results = Detection.query.filter_by(filename=filename).all()
    return [result.to_dict() for result in results]
