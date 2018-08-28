const selectData = () => {
  const query = []; 
    query.push('SELECT ');
    query.push('seq, '); 
    query.push('content '); 
    query.push('FROM ');  
    query.push('test '); 

  return query.join(''); 
}

const selectSingleData = (seq) => {
  const query = []; 
    query.push('SELECT ');
    query.push('seq, '); 
    query.push('content '); 
    query.push('FROM ');  
    query.push('test ');
    query.push('WHERE '); 
    query.push(`seq=${seq}`); 
  
  return query.join(''); 
}

const insertData = (params) => {
  const query = []; 
    query.push('INSERT INTO test( '); 
    query.push('content '); 
    query.push(') '); 
    query.push('VALUES ( ');
    query.push(`'${params.content}' `);
    query.push(') '); 

  return query.join(''); 
}

const deleteData = (seq) => {
  const query = []; 
    query.push('DELETE FROM ');
    query.push('test ');
    query.push('WHERE ');
    query.push(`seq=${seq} `);

  return query.join(''); 
}

const updateData = (seq, params) => {
  const query = [];
  // UPDATE test SET content='UPDATE CONTENT' WHERE seq=1 
    query.push('UPDATE '); 
    query.push('test '); 
    query.push('SET '); 
    query.push(`content='${params.content}' `);
    query.push('WHERE '); 
    query.push(`seq=${seq} `); 
  
  return query.join(''); 
}



module.exports = {
  selectData, 
  insertData, 
  selectSingleData, 
  deleteData, 
  updateData 
}