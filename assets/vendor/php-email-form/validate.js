/**
* PHP Email Form Validation - v3.1
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;

      let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
      
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData( thisForm );

      if ( recaptcha ) {
        if(typeof grecaptcha !== "undefined" ) {
          grecaptcha.ready(function() {
            try {
              grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
              .then(token => {
                formData.set('recaptcha-response', token);
                php_email_form_submit(thisForm, action, formData);
              })
            } catch(error) {
              displayError(thisForm, error)
            }
          });
        } else {
          displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
        }
      } else {
        submitData(thisForm,formData);
      }
    });
  });

function submitData(thisForm,formData){
  var data = [];
  for (var value of formData.values()) {
    data.push(value);
 } 
 console.log(data); 
 var date = new Date(Date.now());
 db.collection("forms").add({
    name: data[0],
      email:data[1],
      subject: data[2],
      message: data[3],
      timestamp: date,
  }).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      thisForm.querySelector('.loading').classList.remove('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.add('d-block');
      thisForm.reset(); 
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
      displayError(thisForm, error)
  });
}

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
