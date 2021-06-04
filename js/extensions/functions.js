
//@ append > records to spreadsheet
function render( card , doc ) {

    // create > elements
    let li   = document.createElement('li');     //: record
    let cont = document.createElement('span');   //: text
    let del  = document.createElement('span');   //: delete button

    // set > elements
    li.setAttribute('data-id', doc.id);
    li.classList.add('card__item');
    del.classList.add('delete');

    // set > content
    cont.textContent = doc.data().name + ' [' + doc.data().amount + ']';
    del.textContent  = 'x';

    // append > elements to DOM
    li.appendChild(cont);
    li.appendChild(del);
    card.appendChild(li);

    // delete > record
    del.addEventListener('click', e => {
        let collection = e.target.parentNode.parentNode.getAttribute('data-card-type')
        let rec_id = e.target.parentNode.getAttribute('data-id');
        delRec( collection, rec_id );
    });

}

//@ save > record
function saveRec() {

    // get > data
    let name     = form.name.value ? form.name.value : 'name';
    let category = form.category.value ? form.category.value : 'category';
    let amount   = form.amount.value ? form.amount.value : 1;
    let priority = form.priority.value ? form.priority.value : 'priority';

    console.log(name, category, amount, priority);

    // save > new records
    db.collection(category).add({
        name, category, amount, priority
    })
    .then(() => {
        msg('success');

        // clear > fields
        form.name.value     = '';
        form.amount.value   = '';
        form.priority.value = '';
    })
    .catch( msg('failure'));

}

//@ delete > record
function delRec( collection , record_id ) {
    db.collection(collection).doc('' + record_id).delete();
}

//@ show > message
function msg( type ) {

    //: success message 
    if( type == 'success' ) {
        document.querySelector('.msg .success').classList.add('active');
        document.querySelector('.msg').classList.add('show');

        setTimeout(() => {
            document.querySelector('.msg .success').classList.remove('active');
            document.querySelector('.msg').classList.remove('show');
        }, 3000);
    }
    //: failure message 
    if( type == 'failure' ) {
        document.querySelector('.msg .success').classList.add('active');
        document.querySelector('.msg').classList.add('show');

        setTimeout(() => {
            document.querySelector('.msg .success').classList.remove('active');
            document.querySelector('.msg').classList.remove('show');
        }, 3000);
    }
} 