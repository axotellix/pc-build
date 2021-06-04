
// [ PRESETS ]
let table       = document.querySelector('.spreadsheet');
let edited_recs = [];
let new_recs    = [];
let empty_id    = 1;
const add  = document.querySelector('.add');
const save = document.querySelector('.save');


// [ MAIN ]

// render > all records
db.collection('posts').orderBy('id').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    
    changes.forEach(change => {
        if( change.type == 'added' ) {
            render(change.doc);
        } else if( change.type == 'removed' ) {
            let removed = table.querySelector('[data-id=' + change.doc.id + ']');
            table.removeChild(removed);
        }
    });

    let cells = table.querySelectorAll('.cell');
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
        
});

// add > new record
add.addEventListener('click', () => {
    renderEmpty();
});

// save > changes
save.addEventListener('click', () => {
    saveChanges();
});


