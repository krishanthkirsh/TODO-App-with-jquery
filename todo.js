var FormObj = {pagesize:5};

$(document).ready(function() {
    $('#todotextbox').keypress(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '13')
		{
			//get the value form input text 
			var enteredText = $('#todotextbox').val();
			// checking the textbox length
			if(enteredText.trim().length > 0){
				
				if ($('#todolist li:contains("'+enteredText+'")').length > 0) {
					swal("Warning Message!", "You Can't Add duplicate TODO!","error");
					$('#todotextbox').val("");
			} else {
				CreateListItem(event,enteredText);
				//claer the Text Box
				$('#todotextbox').val("");
			}
				
			}
			else{
				//alert for empty string 
				swal("Warning Message!", "You Can't Add Empty TODO!","error");
				
			}
		}
	});
	
	var pagecount = $(".list-group-item").length / FormObj.pagesize;
	
	showpage = function(page){
		$(".list-group-item").hide();
		$(".list-group-item").each(function(n){
			if(n >= FormObj.pagesize * (page - 1) && n < FormObj.pagesize * page)
				$(this).show();
		});
	}
	
	$("#pagin li a").click(function(){
		$("#pagin li a").removeClass("active");
		$(this).attr( "class", "active" )
		showpage(parseInt($(this).text()));
	});
	
	
});



function CreateListItem(event,txt){
	$("#todolist li").removeClass("active");
	$('#todolist').append("<li class='list-group-item active'>"+txt+" "+'<button class="btn btn-danger btn-md" onclick="DeleteTodo(this)">X</button></li>');
	var NumOfListItem = $(".list-group-item").length / FormObj.pagesize;
	var pageNumber = Math.ceil(NumOfListItem);
	showpage(pageNumber);
	
}

function DeleteTodo(event){
	
  swal({
  title: "Are you sure?",
  text: "Do you want delete?",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
		$(event).parent().remove();
		var NumOfListItem = $(".list-group-item").length / FormObj.pagesize;
		var pageNumber = Math.ceil(NumOfListItem);
		showpage(pageNumber);
  } 
});
	
}