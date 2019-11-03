const messages = [];
let nextId = 1;

const rootEl = document.querySelector('#root');
const messagesEl = document.createElement('div');
messagesEl.className = 'card';
messagesEl.dataset.id = 'messages'; 
rootEl.appendChild(messagesEl);

const addEl = document.createElement('button');
addEl.textContent = 'Добавить пост';

addEl.addEventListener('click', function () {
    const message = {
        id: nextId,
        content: `Пост: ${nextId}`,
        favorite: false,
        selected: false,
        likes: 0,
    };
    
    messages.push(message);
    const messageEl = document.createElement('div');
    messageEl.className = 'card-img-top';
    messageEl.innerHTML = `
        <img src="http://placekitten.com/50/50">
        ${message.content}
        <span>| ♡</span>
        <span data-action="likesEl">${message.likes}</span>
        <button data-action="likes" class="btn btn-primary">like</button>
        <button data-action="dislikes" class="btn btn-danger">dislike</button>
        <button data-action="toggle-favorite" class="btn btn-info">*</button>
        <button data-action="remove" class="btn btn-secondary">x</button>
    `;

    console.dir(messageEl);

    messageEl.addEventListener('click', function (ev) {
        if (ev.target.dataset.action === 'toggle-favorite') {
            ev.currentTarget.classList.toggle('message_favorite');
            return;
        }

        if(ev.target.dataset.action === "likes") {

            ev.currentTarget.querySelector('[data-action=likesEl]').textContent++;
            
            message.likes++;

            messages.forEach(el => {
                if(ev.currentTarget.previousElementSibling) {
                    if(message.likes > ev.currentTarget.previousElementSibling.querySelector('[data-action=likesEl]').textContent) {
                        ev.currentTarget.parentElement.insertBefore(
                            ev.currentTarget,
                            ev.currentTarget.previousElementSibling
                        );
                    }
                }
            });
            return;
        }

        if(ev.target.dataset.action === "dislikes") {
            ev.currentTarget.querySelector('[data-action=likesEl]').textContent--;

            message.likes--;

            messages.forEach(el => {
                if(ev.currentTarget.nextElementSibling) {
                    if(message.likes < ev.currentTarget.nextElementSibling.querySelector('[data-action=likesEl]').textContent) {
                        ev.currentTarget.parentElement.insertBefore(
                            ev.currentTarget.nextElementSibling,
                            ev.currentTarget
                        );
                    }
                }
            });

            return;
        }

        if (ev.target.dataset.action === 'remove') {
            ev.currentTarget.parentElement.removeChild(ev.currentTarget);
            return;
        }

        ev.currentTarget.classList.toggle('message_selected');
    });

    
    messagesEl.appendChild(messageEl);
    nextId++;
});

rootEl.appendChild(addEl);
