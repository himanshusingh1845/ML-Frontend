export const BENCHMARK_METRICS = {
  naive_bayes: {
    id: "naive_bayes",
    name: "Multinomial Naive Bayes",
    shortName: "Naive Bayes",
    type: "Probabilistic Generative Classifier",
    accuracy: 95.01,
    precision: 95.37,
    recall: 95.12,
    f1_score: 95.25,
    confusion_matrix: {
      fake_correct: 4467,
      fake_as_real: 229,
      real_correct: 4025,
      real_as_fake: 217
    },
    strengths: [
      "Extremely fast training and near-zero inference latency (~2ms)",
      "Low computational complexity for high-dimensional text vectors",
      "Performs well on smaller lexical sample sizes and frequencies"
    ],
    limitations: [
      "Assumes strong feature independence between words (unrealistic in natural language)",
      "Cannot model complex interaction terms or contextual dependencies"
    ]
  },
  logistic_regression: {
    id: "logistic_regression",
    name: "Logistic Regression",
    shortName: "Logistic Regression",
    type: "Discriminative Linear Classifier (L2 Penalty)",
    accuracy: 99.07,
    precision: 99.32,
    recall: 98.91,
    f1_score: 99.11,
    confusion_matrix: {
      fake_correct: 4645,
      fake_as_real: 51,
      real_correct: 4210,
      real_as_fake: 32
    },
    strengths: [
      "Directly optimizes conditional class log-likelihood P(Y|X)",
      "Learns positive and negative continuous weights for each n-gram token",
      "Significantly fewer false positives on test benchmarks (99.32% precision)"
    ],
    limitations: [
      "Linear decision boundary cannot capture non-linear semantic interactions",
      "Susceptible to dataset-specific vocabulary biases (e.g. source publication cues)"
    ]
  }
};

export const COMPARISON_CHART_DATA = [
  { metric: "Accuracy", "Logistic Regression": 99.07, "Naive Bayes": 95.01 },
  { metric: "Precision", "Logistic Regression": 99.32, "Naive Bayes": 95.37 },
  { metric: "Recall", "Logistic Regression": 98.91, "Naive Bayes": 95.12 },
  { metric: "F1-Score", "Logistic Regression": 99.11, "Naive Bayes": 95.25 }
];

export const DATASET_STATS = {
  name: "ISOT Fake News Dataset (University of Victoria)",
  raw_articles: 44898,
  cleaned_articles: 44689,
  fake_count: 23481,
  real_count: 21417,
  train_split: 35751,
  test_split: 8938,
  split_ratio: "80:20 Stratified",
  vocabulary_size: 5000,
  ngram_range: "Unigrams & Bigrams (1, 2)"
};
