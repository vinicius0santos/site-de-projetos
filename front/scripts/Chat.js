import Comment from "./connectApi/Comment.js";

class Chat{
    #messages = [];
    #isOpened = false;
    
    constructor(username, document){
        this.username = username
        this.document = document;
        this.comment = new Comment(username);

        this.chat = document.createElement('section');
        this.openButton = document.createElement('button');
        this.chatContainer = document.createElement('article');
        this.comments = document.createElement('comments');
        this.inputContainer = document.createElement('div');
        this.textarea = document.createElement('div');
        this.sendMessageButton = document.createElement('button');

        this.inputContainer.append(this.textarea, this.sendMessageButton);
        this.chatContainer.append(this.comments, this.inputContainer);
        this.chat.append(this.openButton, this.chatContainer);
    }

    #createCommentElement(postedBy, message, date, id){
        const comment = document.createElement('article');
        const user = document.createElement('div');
        const textMessage = document.createElement('p');

        user.innerText = postedBy;
        textMessage.innerText = message;
        comment.setAttribute('id', 'comment'+id);
        comment.dataset.id = id;
        comment.append(user, textMessage);

        return comment
    }

    async load(){
        this.openButton.addEventListener('click', () => {
            this.#isOpened = !this.#isOpened;

            this.#isOpened ? this.open() : this.close();
        });
        this.sendMessageButton.addEventListener('click', () => this.postMessage());

        this.textarea.contentEditable = true;
        this.chat.setAttribute('id', 'chat');
        this.openButton.setAttribute('id', 'chat-openclose-button');
        this.chatContainer.setAttribute('id', 'chat-container');
        this.comments.setAttribute('id', 'chat-comments');
        this.inputContainer.setAttribute('id', 'chat-input-container');

        this.document.body.append(this.chat);
        const comments = await Comment.getLatest50();

        if(comments.data){
            comments.data.reverse().forEach(c => {
                const commentElement = this.#createCommentElement(c.posted_by, c.message, c.created_at, c.id);
                
                this.#messages.push(commentElement);
            });
        }

        this.update();
        setInterval(() => this.update(), 1000)
    }

    open(){
        this.chatContainer.style.display = 'flex';
    }
    
    close(){
        this.chatContainer.style.display = 'none';
    }
    
    async update(){
        let lastId = 0;
        if(this.#messages.length > 0){
            lastId = Number(this.#messages[this.#messages.length-1].dataset.id);
        }
        const comments = await Comment.getCommentsAfter(lastId);

        if(comments.data){
            comments.data.forEach(c => {
                const commentElement = this.#createCommentElement(c.posted_by, c.message, c.created_at, c.id);
                
                this.#messages.push(commentElement);
            })
        }

        this.#messages.forEach(m => {
            this.comments.append(m);
        });
    }

    async postMessage(){
        const lines = this.textarea.childNodes;
        let text = lines[0]?.textContent || '';

        for(let i = 1; i < lines.length; i++){
            text += '</br>' + lines[i].textContent;
        }

        const post = await this.comment.post(text)
        console.log(post)
    }
}

export default Chat;
