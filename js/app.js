
// [ PRESETS ]
const lows  = document.querySelector('.low-cost');
const mids  = document.querySelector('.mid-cost');
const highs = document.querySelector('.high-cost');

const form  = document.querySelector('form');

const save  = document.querySelector('.save');


// [ MAIN ]

// render > all records

db.collection('low-cost').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    
    changes.forEach(change => {
        if( change.type == 'added' ) {
            render(lows, change.doc);
        } else if( change.type == 'removed' ) {
            let removed = lows.querySelector('[data-id=' + change.doc.id + ']');
            lows.removeChild(removed);
        }
    });
});
db.collection('mid-cost').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    
    changes.forEach(change => {
        if( change.type == 'added' ) {
            render(mids, change.doc);
        } else if( change.type == 'removed' ) {
            let removed = mids.querySelector('[data-id=' + change.doc.id + ']');
            mids.removeChild(removed);
        }
    });
});
db.collection('high-cost').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    
    changes.forEach(change => {
        if( change.type == 'added' ) {
            render(highs, change.doc);
        } else if( change.type == 'removed' ) {
            let removed = highs.querySelector('[data-id=' + change.doc.id + ']');
            highs.removeChild(removed);
        }
    });
});

// save > record
save.addEventListener('click', e => {
    e.preventDefault();
    saveRec();
});


