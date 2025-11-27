from flask import Flask, request, jsonify
import torch
from torchvision import transforms
from PIL import Image
from model import SignatureCNN

app = Flask(__name__)      # kk

# Load the trained model
model = SignatureCNN()
model.load_state_dict(torch.load(r'C:\Users\Naga Sai\OneDrive\Desktop\PS\backend\flask_api\sign_torch.pth', map_location=torch.device('cpu'), weights_only=True))  # Adjust path to your saved model
model.eval()  # Set model to evaluation mode

# Define image transformation to resize, normalize, and convert to tensor
transform = transforms.Compose([
    transforms.Resize((128, 128)),  # Resize to match the input size the model expects
    transforms.ToTensor(),  # Convert to tensor
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # Normalize with ImageNet stats
])

@app.route('/predict', methods=['POST'])
def predict():
    # Check if file is provided in the request
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    
    try:
        # Open the image from the request
        image = Image.open(file).convert('RGB')
        image = transform(image).unsqueeze(0)  # Apply transformation and add batch dimension

        # Perform inference using the trained model
        with torch.no_grad():
            output = model(image)  # Get model output

            # Assuming the output is a tensor with a single value (e.g., a probability score)
            prediction = output.item()  # Get the scalar value (0-1 range)
            confidence = prediction * 100  # Convert to percentage

        # Based on the output, classify the signature as "Genuine" or "Forged"
        if prediction > 0.5:
            result = {'prediction': 'Genuine', 'confidence': f'{confidence:.2f}%' }
        else:
            result = {'prediction': 'Forged', 'confidence': f'{confidence:.2f}%'}

        return jsonify(result)

    except Exception as e:
        # Return any error that occurs during the image processing or inference
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
