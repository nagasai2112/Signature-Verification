import torch
import torch.nn as nn
import torch.nn.functional as F

class SignatureCNN(nn.Module):
    def __init__(self):
        """
        Initialize the CNN model for signature verification.
        """
        super(SignatureCNN, self).__init__()

        # Convolutional layers with increasing depth
        self.conv1 = nn.Conv2d(3, 32, kernel_size=3, stride=1, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, stride=1, padding=1)
        self.conv3 = nn.Conv2d(64, 128, kernel_size=3, stride=1, padding=1)

        # Max-pooling layer for reducing the spatial dimensions
        self.pool = nn.MaxPool2d(kernel_size=2, stride=2, padding=0)

        # Fully connected layers for classification
        self.fc1 = nn.Linear(128 * 16 * 16, 512)  # Flattened size after pooling
        self.fc2 = nn.Linear(512, 1)  # Output layer: 1 value (genuine or forged)
        self.sigmoid = nn.Sigmoid()  # Sigmoid activation to output a probability

    def forward(self, x):
        """
        Forward pass through the network.

        :param x: Input image tensor.
        :return: Output probability (between 0 and 1).
        """
        # Apply convolutional layers followed by ReLU and max-pooling
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = self.pool(F.relu(self.conv3(x)))

        # Flatten the tensor for the fully connected layers
        x = x.view(-1, 128 * 16 * 16)

        # Apply fully connected layers
        x = F.relu(self.fc1(x))
        x = self.fc2(x)

        # Apply sigmoid to get a probability output
        x = self.sigmoid(x)

        return x
