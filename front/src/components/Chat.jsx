import { useEffect, useRef, useState } from 'react';
import '../styles/Chat.css';
import Comment from '../api/Comment';
import TextAreaAutosize from 'react-textarea-autosize';

const chatDelay = 2000;

export default function Chat({username}){
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
          c = await Comment.getLatest50();
        }
        else{
          c = await Comment.getCommentsAfter(comments[comments.length - 1].id);

          if(c.length > 0 && c[c.length-1].posted_by != username) {
            setIsNewMessage(true);
          }
        }
        if(isOnBottom){
          scrollToBottom();
          setIsNewMessage(false);
        }

        setTimeout(() => setComments([...comments, ...c.reverse()]), chatDelay);
    })()
  }, [comments])

  const postComment = async () => {
    const comment = new Comment(localStorage.getItem('username'));
    await comment.post(message);
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
    return username == comment.posted_by ? 'logged-user' : '';
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
    let copy = message.split('\n');
    if(copy.length > 1){
      copy.pop()
    }

    return copy.map((c,i) => 
      <span key={i}>
        {c}
        <br/>
      </span>
    )
  }

  return (
    <section className='chat'>
      <button 
        className='open-button' 
        onClick={handleOpenButton} 
        id={isNewMessage ? 'new-message' : ''} 
      />
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
