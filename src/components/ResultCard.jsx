import React from 'react';

export const ResultCard = ({ result }) => {
    if (!result) return null;

    const { summary, keyPoints, sentiment } = result;

    const getSentimentClass = (sent) => {
        switch (sent?.toLowerCase()) {
            case 'positive': return 'sentiment-positive';
            case 'negative': return 'sentiment-negative';
            case 'neutral': return 'sentiment-neutral';
            default: return 'sentiment-neutral';
        }
    };

    return (
        <div className="result-card">
            <div className="result-section">
                <h3>Summary</h3>
                <div className="summary-box">
                    {summary}
                </div>
            </div>

            <div className="result-section">
                <h3>Key Points</h3>
                <ul className="key-points-list">
                    {keyPoints && keyPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            </div>

            <div className="result-section" style={{ marginBottom: 0 }}>
                <h3>Sentiment</h3>
                <span className={`sentiment-badge ${getSentimentClass(sentiment)}`}>
                    {sentiment}
                </span>
            </div>
        </div>
    );
};
