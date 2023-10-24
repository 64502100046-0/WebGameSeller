function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "localhost:3000/game");
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var trHTML = ''; 
        const objects = JSON.parse(this.responseText);
        for (let object of objects) {
          trHTML += '<tr>'; 
          trHTML += '<td>'+object['id']+'</td>';
          trHTML += '<td><img width="100px" src="'+object['coverimage']+'" class="avatar"></td>';
          trHTML += '<td>'+object['gname']+'</td>';
          trHTML += '<td>'+object['price']+'</td>';
          trHTML += '<td>'+object['amount']+'</td>';

          trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showGameEditBox('+object['id']+')">Edit</button>';
          trHTML += '<button type="button" class="btn btn-outline-danger" onclick="userDelete('+object['id']+')">Del</button></td>';
          trHTML += "</tr>";
        }
        document.getElementById("mytable").innerHTML = trHTML;
      }
    };
  }
  
  loadTable();

  