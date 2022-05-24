import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 p-3">
          <article className="text-center space-y-5">
            <p className="text-2xl font-semibold text-hp-green-700">
              Please try to refresh the page, Thank You!
            </p>
          </article>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
