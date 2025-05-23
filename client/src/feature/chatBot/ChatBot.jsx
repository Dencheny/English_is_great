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
            Authorization: `Bearer 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`,
            'HTTP-Referer': 'http://localhost',
            'X-Title': 'chat-bot-test',
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
              {msg.role === 'assistant' ? (
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
