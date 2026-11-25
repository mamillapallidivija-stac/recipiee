import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <main className="error-page"><span className="eyebrow">A little kitchen mishap</span><h1>Let’s try that again.</h1><p>Something interrupted this page. Your saved recipes are still right where you left them.</p><Link className="button button--primary" to="/">Back to the kitchen</Link></main>;
    }
    return this.props.children;
  }
}
