
  
  axios.post('http://localhost:3000/api/Photos/manager/upload?filename=' + finalFileName, fd)
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err));