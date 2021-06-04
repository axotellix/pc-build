
//@ append > records to spreadsheet
function render( doc ) {

    // create > elements
    let li          = document.createElement('li');     //: record
    let span_id     = document.createElement('span');
    let span_date   = document.createElement('span');
    let span_status = document.createElement('span');
    let span_good   = document.createElement('span');
    let span_mild   = document.createElement('span');
    let span_poor   = document.createElement('span');

    // set > elements
    li.setAttribute('data-id', doc.id);
    li.classList.add('row');
    span_id.classList.add('cell', 'id');
    span_date.classList.add('cell', 'date');
    span_status.classList.add('cell', 'status');
    span_good.classList.add('cell', 'good');
    span_mild.classList.add('cell', 'mild');
    span_poor.classList.add('cell', 'poor');

    // set > content
    span_id.textContent     = doc.data().id;
    span_date.textContent   = doc.data().date;
    span_status.textContent = doc.data().status;
    span_good.textContent   = doc.data().good;
    span_mild.textContent   = doc.data().mild;
    span_poor.textContent   = doc.data().poor;

    // append > elements to DOM
    li.appendChild(span_id);
    li.appendChild(span_date);
    li.appendChild(span_status);
    li.appendChild(span_good);
    li.appendChild(span_mild);
    li.appendChild(span_poor);
    table.appendChild(li);

}


//@ append > empty record to the end of spreadsheet
function renderEmpty() {

    // create > elements
    let li          = document.createElement('li');     //: record
    let span_id     = document.createElement('span');
    let span_date   = document.createElement('span');
    let span_status = document.createElement('span');
    let span_good   = document.createElement('span');
    let span_mild   = document.createElement('span');
    let span_poor   = document.createElement('span');

    // set > elements
    li.setAttribute('data-id', 'empty-' + empty_id); empty_id++;
    li.classList.add('row', 'empty');
    span_id.classList.add('cell', 'id');
    span_date.classList.add('cell', 'date');
    span_status.classList.add('cell', 'status');
    span_good.classList.add('cell', 'good');
    span_mild.classList.add('cell', 'mild');
    span_poor.classList.add('cell', 'poor');

    // set > content
    let recs = table.querySelectorAll('.row');
    let last_id = recs[Object.keys(recs).reverse()[0]].querySelector('.id').textContent;
    span_id.textContent = ++last_id;

    // append > elements to DOM
    li.appendChild(span_id);
    li.appendChild(span_date);
    li.appendChild(span_status);
    li.appendChild(span_good);
    li.appendChild(span_mild);
    li.appendChild(span_poor);
    table.appendChild(li);


    let cells = li.querySelectorAll('.cell');
    for( let i = 0 ; i < cells.length ; i++ ) {

        // make > cell editable
        cells[i].addEventListener('click', () => {
            addRec(cells[i]);
        });
        // keep > cell previous value
        cells[i].addEventListener('focus', () => {
            setRec(cells[i]);
        });
        // check > if value was changed
        cells[i].addEventListener('blur', () => {
            regChange(cells[i], cells[i].parentNode.getAttribute('data-id'));
        });

    }

}


//@ add > new record
function addRec(cell) {
    cell.setAttribute('contenteditable', 'true');
    cell.focus();
}

//@ set > record`s content
let cont;
function setRec(cell) {
    cont = cell.textContent;
}

//@ register > new changes (keep record IDs)
function regChange(cell, rec_id) {
    let cur_cont = cell.textContent;

    //? if > changes made
    if(cur_cont != cont) {
        //? if > change not yet registered [keep changes]
        if( !edited_recs.includes(rec_id) && !cell.parentNode.classList.contains('empty') ) {
            edited_recs.push(rec_id);

            // show > save button
            let ctrl_save = document.querySelector('.save');
            if(ctrl_save.getAttribute('class') != 'active') {
                ctrl_save.classList.add('active');
            }
        }
        //? if > change not yet registered [keep new notes]
        if( !new_recs.includes(rec_id) && cell.parentNode.classList.contains('empty') ) {
           new_recs.push(rec_id);

            // show > save button
            let ctrl_save = document.querySelector('.save');
            if(ctrl_save.getAttribute('class') != 'active') {
                ctrl_save.classList.add('active');
            }
        }
    }
}

//@ save > changes
function saveChanges() {

    // save > changes
    edited_recs.forEach(rec_id => {
        let rec = table.querySelector('[data-id="' + rec_id + '"]');

        let id = rec.querySelector('.id').textContent;
        let date = rec.querySelector('.date').textContent;
        let status = rec.querySelector('.status').textContent;
        let good = rec.querySelector('.good').textContent;
        let mild = rec.querySelector('.mild').textContent;
        let poor = rec.querySelector('.poor').textContent;

        db.collection('posts').doc(rec_id).update({
            id, date, status, good, mild, poor
        })
        .then( msg('success') )
        .catch( msg('failure'));
    });

    // save > new records
    new_recs.forEach(rec_id => {
        let rec = table.querySelector('[data-id="' + rec_id + '"]');

        let id = rec.querySelector('.id').textContent;
        let date = rec.querySelector('.date').textContent;
        let status = rec.querySelector('.status').textContent;
        let good = rec.querySelector('.good').textContent;
        let mild = rec.querySelector('.mild').textContent;
        let poor = rec.querySelector('.poor').textContent;

        db.collection('posts').add({
            id, date, status, good, mild, poor
        })
        .then( msg('success') )
        .catch( msg('failure'));
        table.removeChild(rec);
    });

    // clear > changes arrays
    edited_recs = [];
    new_recs    = [];

    // hide > save button
    save.classList.remove('active');

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