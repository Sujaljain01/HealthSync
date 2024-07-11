import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn import metrics
import joblib
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
# Load your dataset from the CSV file
df = pd.read_csv("C:\\Users\\priya\\Downloads\\dataset.csv")

# Assuming your CSV has columns 'symptoms' and 'specialization'
X = df['symptoms']
y = df['doctor']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

# Create a pipeline with CountVectorizer and Random Forest Classifier
model = make_pipeline(CountVectorizer(), RandomForestClassifier())

# Train the model
model.fit(X_train, y_train)

# Predict on the test set
y_pred = model.predict(X_test)

# Evaluate the model
accuracy = metrics.accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy}")

# Test the model with new symptoms
new_symptoms = ["cough,cold,sneezing"]
predictions = model.predict(new_symptoms)
print(f"Predictions: {predictions}")

# with open('your_model.pkl', 'wb') as model_file:
#     pickle.dump(model, model_file)

joblib.dump(model, 'your_model.joblib')

# # Save the CountVectorizer separately
# with open('count_vectorizer.json', 'w') as vectorizer_file:
#     vectorizer_config = model.named_steps['countvectorizer'].get_params()

#     # Filter out non-serializable values, such as classes (type objects)
#     serializable_config = {key: value for key, value in vectorizer_config.items() if not isinstance(value, type)}

#     json.dump(serializable_config, vectorizer_file)
# joblib.dump(model, 'your_model.joblib')

app = Flask(__name__)
CORS(app)
# Load the scikit-learn model
model = joblib.load("your_model.joblib")

@app.route('/predict-specialization', methods=['GET', 'POST'])
def predict_specialization():
    if request.method == 'POST':
        try:
            # Ensure the content type is JSON
            if request.is_json:
                symptoms = request.json.get('symptoms')
                prediction = model.predict([symptoms])[0]
                return jsonify({'prediction': prediction})
            else:
                return jsonify({'error': 'Invalid content type. Expected JSON.'}), 400
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    elif request.method == 'GET':
        return 'GET request received, but this endpoint expects a POST request.'




@app.route('/')
def home():
    return 'Hello, this is the home page!'

if __name__ == '__main__':
    app.run(debug=True)