import os
import sys
import re
import json
import urllib.request
import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report, confusion_matrix

def clean_text(text):
    """
    Original text cleaning function from Cell 33 of FAKE_NEWS_DETECTION_USING_TF_IDF.ipynb:
    1. Lowercase text
    2. Remove URLs (http\S+|www\S+)
    3. Remove HTML tags (<.*?>)
    4. Remove non-alphanumeric characters except whitespace ([^a-zA-Z0-9\s])
    5. Replace multiple whitespace with a single space (\s+)
    6. Strip leading and trailing whitespace
    """
    return re.sub(r'\s+', ' ', re.sub(r'[^a-zA-Z0-9\s]', ' ', re.sub(r'<.*?>', '', re.sub(r'http\S+|www\S+', '', text.lower())))).strip() if isinstance(text, str) else ""

def download_file(url, target_path):
    if os.path.exists(target_path) and os.path.getsize(target_path) > 1000000:
        print(f"File already exists: {target_path} ({os.path.getsize(target_path)} bytes)")
        return
    print(f"Downloading from {url} to {target_path}...")
    urllib.request.urlretrieve(url, target_path)
    print(f"Downloaded: {target_path} ({os.path.getsize(target_path)} bytes)")

def main():
    data_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")
    models_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "backend", "app", "models")
    os.makedirs(data_dir, exist_ok=True)
    os.makedirs(models_dir, exist_ok=True)

    fake_csv = os.path.join(data_dir, "Fake.csv")
    true_csv = os.path.join(data_dir, "True.csv")

    fake_url = "https://huggingface.co/datasets/genesisqu/fake-real-news/resolve/main/Fake.csv"
    true_url = "https://huggingface.co/datasets/genesisqu/fake-real-news/resolve/main/True.csv"

    download_file(fake_url, fake_csv)
    download_file(true_url, true_csv)

    print("Loading Fake News Dataset...")
    fake = pd.read_csv(fake_csv)
    print("Loading Real News Dataset...")
    true = pd.read_csv(true_csv)

    print(f"Fake News Dataset Shape: {fake.shape}")
    print(f"Real News Dataset Shape: {true.shape}")

    # Assign labels as in notebook
    fake['label'] = 0
    true['label'] = 1

    print("Concatenating datasets...")
    df = pd.concat([fake, true], axis=0, ignore_index=True)
    print(f"Combined Dataset Shape: {df.shape}")

    print("Shuffling combined dataset with random_state=42...")
    df = df.sample(frac=1, random_state=42).reset_index(drop=True)

    print("Removing duplicates...")
    df = df.drop_duplicates().reset_index(drop=True)
    print(f"Dataset Shape After Removing Duplicates: {df.shape}")

    print("Selecting relevant columns ('title', 'text', 'label')...")
    df = df[['title', 'text', 'label']]

    print("Combining title and text...")
    df['content'] = df['title'].fillna('') + ' ' + df['text'].fillna('')

    print("Cleaning text content using original clean_text function...")
    df['cleaned_content'] = df['content'].apply(clean_text)

    X = df['cleaned_content']
    y = df['label']

    print("Performing stratified train_test_split (80/20, random_state=42)...")
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=42, stratify=y)
    print(f"Training Samples: {len(X_train)}, Testing Samples: {len(X_test)}")

    print("Fitting TfidfVectorizer(max_features=5000, ngram_range=(1, 2))...")
    tfidf = TfidfVectorizer(max_features=5000, ngram_range=(1, 2))
    X_train_tfidf = tfidf.fit_transform(X_train)
    X_test_tfidf = tfidf.transform(X_test)
    print(f"Extracted {len(tfidf.get_feature_names_out())} features.")

    print("Training Multinomial Naive Bayes model...")
    nb_model = MultinomialNB()
    nb_model.fit(X_train_tfidf, y_train)
    y_pred_nb = nb_model.predict(X_test_tfidf)

    acc_nb = accuracy_score(y_test, y_pred_nb)
    prec_nb = precision_score(y_test, y_pred_nb, pos_label=0)
    rec_nb = recall_score(y_test, y_pred_nb, pos_label=0)
    f1_nb = f1_score(y_test, y_pred_nb, pos_label=0)

    print("\n--- Multinomial Naive Bayes Results ---")
    print(f"Accuracy:  {acc_nb:.4f} ({acc_nb*100:.2f}%)")
    print(f"Precision: {prec_nb:.4f} ({prec_nb*100:.2f}%)")
    print(f"Recall:    {rec_nb:.4f} ({rec_nb*100:.2f}%)")
    print(f"F1-Score:  {f1_nb:.4f} ({f1_nb*100:.2f}%)")

    print("\nTraining Logistic Regression model (max_iter=1000, random_state=42)...")
    lr_model = LogisticRegression(max_iter=1000, random_state=42)
    lr_model.fit(X_train_tfidf, y_train)
    y_pred_lr = lr_model.predict(X_test_tfidf)

    acc_lr = accuracy_score(y_test, y_pred_lr)
    prec_lr = precision_score(y_test, y_pred_lr, pos_label=0)
    rec_lr = recall_score(y_test, y_pred_lr, pos_label=0)
    f1_lr = f1_score(y_test, y_pred_lr, pos_label=0)

    print("\n--- Logistic Regression Results ---")
    print(f"Accuracy:  {acc_lr:.4f} ({acc_lr*100:.2f}%)")
    print(f"Precision: {prec_lr:.4f} ({prec_lr*100:.2f}%)")
    print(f"Recall:    {rec_lr:.4f} ({rec_lr*100:.2f}%)")
    print(f"F1-Score:  {f1_lr:.4f} ({f1_lr*100:.2f}%)")

    # Serialize artifacts
    vectorizer_path = os.path.join(models_dir, "tfidf_vectorizer.joblib")
    nb_path = os.path.join(models_dir, "naive_bayes_model.joblib")
    lr_path = os.path.join(models_dir, "logistic_regression_model.joblib")
    metrics_path = os.path.join(models_dir, "metrics.json")

    print(f"\nSaving vectorizer to {vectorizer_path}...")
    joblib.dump(tfidf, vectorizer_path)

    print(f"Saving Naive Bayes model to {nb_path}...")
    joblib.dump(nb_model, nb_path)

    print(f"Saving Logistic Regression model to {lr_path}...")
    joblib.dump(lr_model, lr_path)

    metrics_data = {
        "dataset": {
            "name": "ISOT Fake News Dataset",
            "fake_count": len(fake),
            "true_count": len(true),
            "total_raw": len(fake) + len(true),
            "total_cleaned": len(df),
            "train_samples": len(X_train),
            "test_samples": len(X_test),
            "test_split_ratio": 0.20,
            "random_state": 42
        },
        "vectorizer": {
            "type": "TfidfVectorizer",
            "max_features": 5000,
            "ngram_range": [1, 2]
        },
        "models": {
            "naive_bayes": {
                "name": "Multinomial Naive Bayes",
                "accuracy": round(acc_nb, 4),
                "precision": round(prec_nb, 4),
                "recall": round(rec_nb, 4),
                "f1_score": round(f1_nb, 4),
                "accuracy_percent": round(acc_nb * 100, 2),
                "precision_percent": round(prec_nb * 100, 2),
                "recall_percent": round(rec_nb * 100, 2),
                "f1_percent": round(f1_nb * 100, 2)
            },
            "logistic_regression": {
                "name": "Logistic Regression",
                "accuracy": round(acc_lr, 4),
                "precision": round(prec_lr, 4),
                "recall": round(rec_lr, 4),
                "f1_score": round(f1_lr, 4),
                "accuracy_percent": round(acc_lr * 100, 2),
                "precision_percent": round(prec_lr * 100, 2),
                "recall_percent": round(rec_lr * 100, 2),
                "f1_percent": round(f1_lr * 100, 2)
            }
        }
    }

    with open(metrics_path, 'w', encoding='utf-8') as f:
        json.dump(metrics_data, f, indent=2)
    print(f"Saved evaluation metrics to {metrics_path}!")

    # Quick test sample from notebook
    test_headline = "The government announced a new education policy to improve learning opportunities for students."
    test_cleaned = clean_text(test_headline)
    test_vec = tfidf.transform([test_cleaned])
    pred_lr = lr_model.predict(test_vec)[0]
    prob_lr = lr_model.predict_proba(test_vec)[0]
    label_str = "Fake News" if pred_lr == 0 else "Real News"
    print(f"\nQuick Validation Test:")
    print(f"Input: {test_headline}")
    print(f"Prediction: {label_str} (Class 0 / Fake prob: {prob_lr[0]:.4f}, Class 1 / Real prob: {prob_lr[1]:.4f})")
    print("\nModel training & serialization complete successfully!")

if __name__ == '__main__':
    main()
