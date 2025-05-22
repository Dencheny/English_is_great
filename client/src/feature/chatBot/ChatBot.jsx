import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');

    const systemPrompt = {
      role: 'system',
      content:
        'Ты ассистент, специализирующийся исключительно на обучении иностранным языкам. Отвечай только на вопросы, связанные с языками, грамматикой, переводом, изучением и практикой. Если вопрос не по теме, вежливо объясни, что ты можешь отвечать только на вопросы по иностранным языкам.',
    };

    try {
      const response = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer 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',
            'HTTP-Referer': 'http://localhost',
            'X-Title': 'language-assistant',
          },
          body: JSON.stringify({
            model: 'meta-llama/llama-4-maverick',
            messages: [systemPrompt, ...messages, userMessage],
            temperature: 0.7,
            max_tokens: 512,
          }),
        }
      );

      const data = await response.json();
      const botReply =
        data?.choices?.[0]?.message?.content?.trim() || '🤖 Ответ не получен.';

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: botReply },
      ]);
    } catch (error) {
      console.error('Ошибка:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '❌ Произошла ошибка при получении ответа от ИИ.',
        },
      ]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <h1 className="chat-title">Чат по изучению языков</h1>

        <div className="chat-messages" id="messages">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-bubble ${msg.role === 'user' ? 'user' : 'bot'}`}
            >
              {msg.role === 'bot' ? (
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              ) : (
                msg.content
              )}
            </div>
          ))}
        </div>

        <div className="chat-input-row">
          <input
            type="text"
            className="chat-input"
            placeholder="Спроси о грамматике, словах, переводе..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend} className="chat-button">
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
