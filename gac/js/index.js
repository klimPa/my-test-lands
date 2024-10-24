function initFancy()
{

	$(".fancybox-gallery").fancybox(
	{
		theme : 'light',
		helpers : { thumbs : true },
		openEffect  : 'fade',
		closeEffect : 'fade',
		nextEffect  : 'fade',
		prevEffect  : 'fade',
		'showNavArrows' :   true
	});
	
	$(document).on("click",".popup",function(){
		var _form_id = $(this).attr('href');

		var _form_title = $(this).data('title');
		var _form_comment = $(this).data('comment');
		var _form_name = $(this).data('form_name');
		var _form_type_model_name = $(this).data('form_type_model_name');
		var _form_diler = $(this).data('form_diler');
		
		var _select_val = $(this).attr('_select_val');

		$(".popup_container .form_title").html(_form_title);

		$.fancybox.open( $(_form_id).html(),
		{
			padding: 0,
			content: $(_form_id).html(),
		//	modal: true,
			scrolling: "no",
			margin: 5,
			/*closeBtn: false,*/
			afterShow: function()
			{
			
			
				$(".popup_container input[name='title']").val(_form_title);
				$(".popup_container input[name='comment']").val(_form_comment);
				$(".popup_container input[name='form_name']").val(_form_name);
				$(".popup_container input[name='form_type_model_name']").val(_form_type_model_name);
				$(".popup_container input[name='form_diler']").val(_form_diler);
				$(".popup_container").attr("data-callkeeper_name",_form_title);
				$(".popup_container").attr('data-flash-title',_form_title);

				modeInputMask();

				if ( typeof(_select_val)!="undefined" ) $('.popup_container select').val( _select_val );
				
				
				
			}
		} );
		return false;
	});
}//end_ func


function modeInputMask() {
    $("input[name=phone]").inputmask("+7(999) 999-99-99");
                
    let inputs = document.querySelectorAll("input[name=phone]");
        
    for (const input of inputs) {

        input.oninput = function(e) {
            let firstChar = this.value.substr(0, 4);
                
            switch (firstChar) {
                case "+7(7":
                    this.value = "+7(___) ___-__-__";
                    $("input[name=phone]").inputmask("+7(999) 999-99-99");
                    this.setSelectionRange(3, 3);
                    break;
				case "+7(1":
					this.value = "+7(___) ___-__-__";
					$("input[name=phone]").inputmask("+7(999) 999-99-99");
					this.setSelectionRange(3, 3);
                	break;
				case "+7(2":
					this.value = "+7(___) ___-__-__";
					$("input[name=phone]").inputmask("+7(999) 999-99-99");
					this.setSelectionRange(3, 3);
                	break;
				case "+7(3":
					this.value = "+7(___) ___-__-__";
					$("input[name=phone]").inputmask("+7(999) 999-99-99");
					this.setSelectionRange(3, 3);
                	break;
				case "+7(5":
					this.value = "+7(___) ___-__-__";
					$("input[name=phone]").inputmask("+7(999) 999-99-99");
					this.setSelectionRange(3, 3);
                	break;
				case "+7(6":
					this.value = "+7(___) ___-__-__";
					$("input[name=phone]").inputmask("+7(999) 999-99-99");
					this.setSelectionRange(3, 3);
                	break;
            }   
        }
    }
}

function initForm()
{
	
	modeInputMask();

	$( "body" ).on( "submit", ".all_forms", function()
	{
		if ($(this).hasClass("not_agree")) return false;

		var l_form_object = $(this);
		$("input,textarea,select",this).closest(".form-group").removeClass("has-danger");
		var l_err = false;
		$(".nacc",this).each( function()
		{
			if ( $(this)[0].tagName=="SELECT" || $(this)[0].tagName=="INPUT" )
			{
				if ( $.trim($(this).val())=="" )
				{
					l_err = true;
					$(this).closest(".form-group").addClass("has-danger");
				}//end_ if
			}//end_ if
		} );

		if ( l_err==true )
		{
			alert("В одном или нескольких полях введены неверные данные");
			return false;
		}//end_ if

		$("input,textarea,select", this).closest(".form-group").removeClass("has-danger");
		var l_err = false;
		$(".nacc", this).each(function () {
			if ($(this)[0].tagName == "SELECT" || $(this)[0].tagName == "INPUT") {
				if (($.trim($(this).val())) == "" || (l_phone_mod.length < 12) || (l_phone_mod.substr(0, 3) != "+79")) {
					l_err = true;
					$(this).closest(".form-group").addClass("has-danger");
				} //end_ if
			} //end_ if
		});

		if (l_err == true) {
			$('form').trigger('reset');
			return false;
		}
		
		_form_title = $("input[name='title']",this).val();
		_form_comment = $("input[name='comment']",this).val();
		_form_name = $("input[name='form_name']",this).val();
		_form_type_model_name = $("input[name='form_type_model_name']",this).val();
		_form_diler = $("input[name='form_diler']",this).val();

		var _form = this;

		$.post( "mail.php", $(this).serialize(), function( data )
		{
		console.log(data);
			
			$(_form).trigger('reset');
			$('input[name=files]',_form).val('');
			$('.uploader_text',_form).css('display','inline-block');
			$('.uploader_images_count',_form).hide();
		});

		alert("Сообщение успешно отправлено");
			// $.fancybox.close();

		return false;
	} );
}//end_ func

function _scroll(_this)
{
	var _shift = 0;
	if ($(_this).attr('_shift') != undefined) _shift = $(_this).attr('_shift');
	
	var _m_shift = 0;
	if ($(_this).attr('_m_shift') != undefined) _m_shift = $(_this).attr('_m_shift');

	
	var curWidth = $(window).width();
	if (curWidth <= 991) _shift = _m_shift;

	
	var el = $(_this).attr('href');
	var _pos = $(el).offset().top - $("body").offset().top - _shift;
	
	$("html,body").animate({ scrollTop: _pos }, 500);	
}

function anchor_click()
{
	$('.anchor[href^="#"]').click(function(){
		_scroll(this);	

		return false; 
	});
}

function init_agree()
{
	$(document).on("change","input[name='agree']",function(){
		var _form = $(this).closest('form');
		if ($("input[name='agree']:not(:checked)",_form).length == 0)
			$(_form).removeClass("not_agree");
		else
			$(_form).addClass("not_agree");
		
	});
	$(document).on( "click","form.not_agree input[type='submit'],form.not_agree button[type='submit'],form.not_agree a.submit",function(){
		var _form = $(this).closest('form');
		if ($(_form).hasClass('not_agree')) return false;
	});

	$(document).on( "submit","form",function(){
		if ($(this).hasClass('not_agree')) return false;
	});

	
	
	$( "body" ).on('change','.agree',function()
	{
		var _form = $(this).closest('form');
		if ($('.agree:not(:checked)',_form).length == 0)
			$(_form).removeClass("not_agree");
		else
			$(_form).addClass("not_agree");
		
	});

	$( "body" ).on( "submit", "form", function(){
		if ($(this).hasClass("not_agree")) return false;
	});

}


function initAlert()
{
	window.alert = function( e_msg, e_time )
	{
		$("body").append("<style>.alert{ font-size: 20px; }</style>");
		
		if ( typeof(e_time)!="undefined" )
		{
			setTimeout( function(){ $.fancybox.close(); }, e_time );
		}
		
		e_msg = '<div class="alert">'+e_msg+'</div>';
		
		var instance = $.fancybox.getInstance();
		if ( typeof(instance)=="undefined" || instance==false )
		{
			$.fancybox.open(e_msg);
			return;
		}
		instance.current.$slide.trigger("onReset");
		instance.setContent( instance.current, e_msg );
	}//end_ func
}

$( function()
{
	initAlert();
	init_agree();
	anchor_click();
	initFancy();
	initForm();

	// test WEBP

	function testWebP() {
		return new Promise(res => {
			const webP = new Image();
			webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
			webP.onload = webP.onerror = () => {
				res(webP.height === 2);
			};        
		})
	};

	testWebP().then(hasWebP => document.querySelector('body').classList.add('webp'));

	// test WEBP END;
	
});