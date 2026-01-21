import { useRef, type FormEvent } from "react";

export function APITester() {
  const responseInputRef = useRef<HTMLTextAreaElement>(null);

  const testEndpoint = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const endpoint = formData.get("endpoint") as string;
      const url = new URL(endpoint, location.href);
      const method = formData.get("method") as string;
      const res = await fetch(url, { method });

      const data = await res.json();
      responseInputRef.current!.value = JSON.stringify(data, null, 2);
    } catch (error) {
      responseInputRef.current!.value = String(error);
    }
  };

  return (
    <div className="cyberpunk-card mb-6">
      <h3 className="cyberpunk-title mb-4">API Tester</h3>
      <form
        onSubmit={testEndpoint}
        className="flex items-center gap-3 mb-4"
      >
        <select
          name="method"
          className="cyberpunk-select min-w-[80px]"
        >
          <option value="GET">GET</option>
          <option value="PUT">PUT</option>
        </select>
        <input
          type="text"
          name="endpoint"
          defaultValue="/api/hello"
          className="cyberpunk-input flex-1"
          placeholder="/api/hello"
        />
        <button
          type="submit"
          className="cyberpunk-button"
        >
          Send
        </button>
      </form>
      <textarea
        ref={responseInputRef}
        readOnly
        placeholder="Response will appear here..."
        className="cyberpunk-input w-full min-h-[140px] resize-y"
      />
    </div>
  );
}
