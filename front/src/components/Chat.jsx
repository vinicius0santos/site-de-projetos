import { useEffect, useRef, useState } from 'react';
import '../styles/Chat.css';
import Comment from '../api/Comment';
import TextAreaAutosize from 'react-textarea-autosize';

const chatDelay = 500;

export default function Chat(){
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const commentsRef = useRef(null);
  const [isNewMessage, setIsNewMessage] = useState(false);
  const [isOnBottom, setIsOnBotton] = useState(false);

  useEffect(() => {
    (async () => {
        let c = [];
        if(comments.length == 0){
          c = await Comment.getLatest50() || [];
        }
        else{
          c = await Comment.getCommentsAfter(comments[comments.length - 1].id) || [];

          if(c.length > 0 && c[c.length-1].posted_by != localStorage.getItem('username')) {
            setIsNewMessage(true);
          }
        }
        if(isOnBottom){
          scrollToBottom();
          setIsNewMessage(false);
        }

        setTimeout(() => setComments([...comments, ...c?.reverse()]), chatDelay);
    })()
  }, [comments])

  const postComment = async () => {
    await Comment.post(message);
  }

  const chatOnScroll = () => {
      const elem = commentsRef.current;
      const isScrollMax = elem.scrollHeight - elem.clientHeight <= Math.ceil(elem.scrollTop) + 3;

      setIsOnBotton(isScrollMax);
      if(isScrollMax) {
          setIsNewMessage(false);
      }
  }

  const scrollToBottom = () => {
    if(commentsRef.current){
        commentsRef.current.scrollBy(0, commentsRef.current.scrollHeight + 1000);
    }
  }

  const handleOpenButton = () => {
    if(!isOpen){
      setIsOnBotton(true);
    }
    else{
        commentsRef.current.scrollBy(0, 0);
        setIsOnBotton(false);
    }
    setIsOpen(!isOpen);
  }

  const isLoggedUser = (comment) => {
    return localStorage.getItem('username') == comment.posted_by ? 'logged-user' : '';
  }

  const handleKeyDown = (e) => {
    if(e.key == 'Shift') setIsShiftPressed(true);
  }
  const handleKeyUp = (e) => {
    if(e.key == 'Shift') setIsShiftPressed(false);
    else if(e.key == 'Enter' && !isShiftPressed){
      postComment();
      setMessage('');
      e.target.innerHTML = '';
    }
  }

  const formatMessage = (message) => {
    let message2 = message.split('\n');
    if(message2.length > 1){
      message2.pop()
    }

    return message2.map((c,i) => 
      <span key={i}>
        {c}
        <br/>
      </span>
    )
  }

  return (
    <section className='chat'>
      <button
        className="p-2 rounded-full hover:bg-neutral-800 transition duration-150 relative flex items-center justify-center"
        onClick={handleOpenButton} 
      >
        <svg
          className="w-6 h-6 text-gray-300"
          fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z"></path>
        </svg>
        {isNewMessage && <span className="absolute top-0 right-0 h-2 w-2 bg-[var(--logo)] rounded-full"></span>}
      </button>

      {isOpen && 
      <article className='chat-container'>
        <div className='chat-comments' ref={commentsRef} onScroll={chatOnScroll}>
          {comments.map((c, index) => 
            <div className='comment' id={isLoggedUser(c)} key={index}>
              <div>{c.posted_by}</div>
              <p>{formatMessage(c.message)}</p>
            </div>
          )}
        </div>
        <div className='chat-input-container'>
          <TextAreaAutosize 
            className='chat-textarea' 
            maxRows={3} 
            value={message}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onChange={({target}) => setMessage(target.value)}
          />
          <button className='chat-send-message' type='submit' onClick={postComment}></button>
        </div>
      </article>
      }
    </section>
  )
}
