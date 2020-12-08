var sendContact = ( function($) {
  'use strict';
 
  var URL = 'https://od3wrrb5ne.execute-api.us-east-1.amazonaws.com/prod/siteContact'
  const GENERIC_FAILURE_MESSAGE = 'Sorry, We can not process your request at this time. Please resubmit at a later time.';

  function onSubmitContactForm() {
  //    grecaptcha.execute();
      $('#contact-form').submit();
  }

  function objectifyForm(form) {//serialize data function
    var formArray = form.serializeArray();

    var returnArray = {};
    for (var i = 0; i < formArray.length; i++){
      returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
  }


  function processContactFormSubmit(e) {
    var $form = $("#contact-form");
      var data = objectifyForm($form);
      
      $.ajax({
          type: 'POST',
          url: URL,
          contentType: 'application/json',
          data: JSON.stringify(data),
          dataType: 'json',
          success: function(data) {
              // $("#success-message").show();
              $form.data('bootstrapValidator').resetForm();
          },
          error: function(err) {
              if(err.status === 400) {
                  // $("#failure-message-text").text(err.responseText);
              } else {
                  // $("#failure-message-text").text(GENERIC_FAILURE_MESSAGE);
              }
              // $("#failure-message").show();
              $form.data('bootstrapValidator').resetForm();
          }
      });
  }

  $(document).ready(function() {
      $(document).on('click', '.close', function () {
          $(this).parent().hide();
      });

      $('#contact-form').bootstrapValidator({
        container: "#validation-messages",
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
          name: {
            validators: {
              notEmpty: {
                message: 'Please enter your name'
              }
            }
          },
          email: {
            validators: {
                notEmpty: {
                    message: 'Please enter your email address'
                },
                emailAddress: {
                    message: 'Please enter a valid email address'
                }
            }
          },
          message: {
            validators: {
              stringLength: {
                  max: 500,
                  message:'Please enter at least 10 characters and no more than 500'
              },
              notEmpty: {
                  message: 'Please enter a message'
              }
            }
          }
        }
     })
     .on('success.form.bv', function(e) {
          // $("#success-message").hide();
          // $("#failure-message").hide();
          e.preventDefault();

          processContactFormSubmit(e);
     });

  });
  return {
    onSubmitContactForm: onSubmitContactForm
  };
})(jQuery);
var onSubmitContactForm = sendContact.onSubmitContactForm; // Needs a global function for reCaptcha
