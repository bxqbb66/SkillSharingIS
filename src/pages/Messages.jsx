import { useState } from 'react';
import { chatMessages, getUserById, currentUser } from '../data/mockData';
import { useStore } from '../data/store';
import { avatarUrl } from '../utils/images';

export default function Messages() {
  const store = useStore();
  const [tab, setTab] = useState('chat');
  const [activeChat, setActiveChat] = useState(null);
  const [inputText, setInputText] = useState('');
  const [localMessages, setLocalMessages] = useState({});

  const contacts = store.getContacts();
  const notifs = store.getNotifications();

  const contact = activeChat ? getUserById(activeChat) : null;
  const msgs = activeChat
    ? (localMessages[activeChat] || chatMessages[activeChat] || [])
    : [];

  function handleSend() {
    if (!inputText.trim()) return;
    const key = activeChat;
    const prev = localMessages[key] || chatMessages[key] || [];
    setLocalMessages({
      ...localMessages,
      [key]: [...prev, { from: currentUser.student_id, text: inputText.trim(), time: '刚刚' }],
    });
    setInputText('');
  }

  function handleOpenChat(contactId) {
    store.markContactRead(contactId);
    setActiveChat(contactId);
  }

  // Chat list view
  if (!activeChat) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Tab 切换 */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="flex">
            <button
              onClick={() => setTab('chat')}
              className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                tab === 'chat' ? 'text-primary border-primary' : 'text-gray-500 border-transparent'
              }`}
            >
              聊天
            </button>
            <button
              onClick={() => setTab('notify')}
              className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors relative ${
                tab === 'notify' ? 'text-primary border-primary' : 'text-gray-500 border-transparent'
              }`}
            >
              系统通知
              {notifs.some(n => n.unread) && (
                <span className="absolute top-2 right-1/4 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
          </div>
        </div>

        {/* 聊天列表 */}
        {tab === 'chat' && (
          <div className="flex-1">
            {contacts.map(c => {
              const user = getUserById(c.contact_id);
              if (!user) return null;
              return (
                <button
                  key={c.contact_id}
                  onClick={() => handleOpenChat(c.contact_id)}
                  className="w-full flex items-center gap-3 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="relative">
                    <img
                      src={avatarUrl(user.student_id)}
                      alt={user.name}
                      className="w-12 h-12 rounded-full bg-gray-100"
                    />
                    {c.unread > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                        {c.unread}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-medium text-gray-800">{user.name}</span>
                      <span className="text-xs text-gray-400">{c.last_time}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5 truncate">{c.last_message}</div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* 系统通知列表 */}
        {tab === 'notify' && (
          <div className="flex-1">
            {notifs.map(n => (
              <button
                key={n.id}
                onClick={() => store.markNotifRead(n.id)}
                className={`w-full text-left flex items-start gap-3 px-4 py-3 border-b border-gray-50 ${
                  n.unread ? 'bg-blue-50/50' : ''
                }`}
              >
                <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  n.unread ? 'bg-red-500' : 'bg-gray-300'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700">{n.text}</p>
                  <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Chat conversation view
  return (
    <div className="min-h-screen flex flex-col">
      {/* Chat header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button
          onClick={() => setActiveChat(null)}
          className="text-gray-500 hover:text-gray-700 text-lg"
        >
          ←
        </button>
        <img
          src={avatarUrl(contact?.student_id)}
          alt={contact?.name}
          className="w-9 h-9 rounded-full bg-gray-100"
        />
        <div>
          <div className="text-sm font-medium text-gray-800">{contact?.name}</div>
          <div className="text-xs text-gray-400">{contact?.college}</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 bg-gray-50 px-4 py-4 space-y-3 overflow-y-auto">
        {msgs.map((msg, i) => {
          const isMe = msg.from === currentUser.student_id;
          return (
            <div key={i} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                isMe
                  ? 'bg-primary text-white rounded-br-md'
                  : 'bg-white text-gray-800 rounded-bl-md shadow-sm'
              }`}>
                {msg.text}
              </div>
              <span className="text-[10px] text-gray-400 mt-0.5 px-1">{msg.time}</span>
            </div>
          );
        })}
      </div>

      {/* Input bar */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center gap-3">
        <input
          type="text"
          placeholder="输入消息..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
        <button
          onClick={handleSend}
          className="bg-primary text-white w-9 h-9 rounded-full flex items-center justify-center text-sm hover:bg-primary-light transition-colors shrink-0"
        >
          ↑
        </button>
      </div>
    </div>
  );
}
