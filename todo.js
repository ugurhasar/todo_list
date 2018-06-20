function generateElement(name) {
    var html = '<li class="todo" style="display:none;"><div class="todo-left-side"><span class="glyphicon glyphicon-unchecked" aria-hidden="true"></span></div><div class="todo-right-side"><button type="button" class="close delete-todo" aria-label="Close"><span aria-hidden="true">×</span></button><h3 class="todo-title">' + name + '</h3></div></li>';

    $(html).prependTo('#ul-todo').fadeIn('slow');
}

$(document).ready(function () {
    $('#btn-add-todo').click(function (e) {
        e.preventDefault();

        var name = $('#inp-name').val();

        generateElement(name);
		
		$('#inp-name').val('');
    });
	
	$('#inp-name').keyup(function (e) {
		if(e.keyCode == 13) { $('#btn-add-todo').click(); }
	});

    $('body').on('click', '#ul-todo > li.todo .todo-left-side', function (e) {
        var self = $(this);
        var parent = self.parents('li.todo');

        if (parent.hasClass('disabled')) {
            return true;
        }
        else {
            parent.addClass('disabled');
            self.addClass('active');
            self.html('<span class="glyphicon glyphicon-check" aria-hidden="true"></span>')
        }
    });

	$('body').on({
          mouseenter: function () {
			if($(this).hasClass('active')) { return true};
            $(this).html('<span class="glyphicon glyphicon-check" aria-hidden="true"></span>')
          },
          mouseleave: function () {
			if($(this).hasClass('active')) { return true};
            $(this).html('<span class="glyphicon glyphicon-unchecked" aria-hidden="true"></span>')
          }
        }, '#ul-todo > li.todo .todo-left-side');
	
    $('body').on('click', '#ul-todo > li.todo .delete-todo', function (e) {
        e.stopPropagation();

        var self = $(this);

        var parent = self.parents('li.todo');
        parent.fadeOut('slow').remove();
    });
});