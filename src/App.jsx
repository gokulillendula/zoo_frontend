import { useState } from 'react';
import { ResultCard } from './components/ResultCard';
import './App.css';

function App() {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic frontend validation
        const trimmed = text.trim();
        if (!trimmed) {
            setError('Please enter some text to summarize.');
            return;
        }

        if (trimmed.length < 10) {
            setError('Text is too short. Please enter at least a full sentence.');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch('http://localhost:3001/api/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: trimmed }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong while summarizing.');
            }

            setResult(data);
        } catch (err) {
            setError(err.message || 'Network error. Make sure the backend server is running.');
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setText('');
        setResult(null);
        setError(null);
    };

    return (
        <div className="app-container">
            <header className="header">
                <h1>AI Document Summarizer</h1>
                <p>Extract key points and sentiment from any text in seconds</p>
            </header>

            <main>
                <div className="input-card">
                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Paste your unstructured text here... (e.g., meeting notes, customer feedback, news articles)"
                            rows={10}
                            disabled={loading}
                        />

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <div className="actions">
                            <button
                                type="button"
                                className="btn-secondary"
                                onClick={handleClear}
                                disabled={loading || (!text && !result && !error)}
                            >
                                Clear
                            </button>
                            <button
                                type="submit"
                                className="btn-primary"
                                disabled={loading || !text.trim()}
                            >
                                {loading ? 'Analyzing...' : 'Summarize Text'}
                            </button>
                        </div>
                    </form>
                </div>

                {result && !loading && (
                    <ResultCard result={result} />
                )}
            </main>
        </div>
    );
}

export default App;
