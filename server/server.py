from flask import Flask, request
from flask_restx import Api, Resource, fields, Namespace
from flask_cors import CORS  # ייבוא flask_cors

from suicide import analyze_text

app = Flask(__name__)
CORS(app)  # הפעלת CORS לכל הבקשות

api = Api(app, title="Double Text API", description="API שמכפיל טקסט שנשלח ב-POST")

# הגדרת namespace
ns = Namespace('default', description='Default namespace')
api.add_namespace(ns)

# הגדרת המודל ל-Swagger
text_model = ns.model('TextModel', {
    'text': fields.String(required=True, description='הטקסט להכפלה')
})

@ns.route('/calculateSuicidePost')
class calculate_suicide_text(Resource):
    @ns.expect(text_model)
    @ns.doc(description="מקבל טקסט ומחזיר את מידת האובדנות שבו.")
    def post(self):
        # קבלת הנתונים מהבקשה
        data = request.json
        if not data or 'text' not in data:
            return {"error": "Missing 'text' in request body"}, 400

        # שליפת הטקסט
        text = data['message']

        # קריאה לפונקציה שמחשבת את אחוזי האובדנות
        suicide_rate = analyze_text(text);

        # החזרת התוצאה
        return {"original": text, "suicide_rate": suicide_rate}, 200

if __name__ == '__main__':
    app.run(debug=True)
