var validatorRules = {
    required: function (value) {
        return value ? undefined : 'Vui lòng nhập trường này'
    },
    email: function (value) {
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        return regex.test(value) ? undefined : 'Vui lòng nhập email'
    },
    min: function (min) {
        return function (value) {
            return value.lenghth >= min ? undefined : `Vui lòng nhập ít nhất ${min} kí tự`;
        }
    },

    max: function (max) {
        return function (value) {
            return value.lenghth <= max ? undefined : `Vui lòng nhập tối đa ${max} kí tự`;
        }
    },
};
  //Lấy ra Element trong DOM theo thằng `formSelector`
   var formElement = document.querySelector(formSelector);

   //Chỉ xử lý khi có element trong DOM
   if (formElement) {
       var inputs = formElement.querySelectorAll('[name][rules]')

       for (var input of inputs) {
           var rules = input.getAttribute('rules').split('|');

           for (var rule of rules) {
               var ruleInfo;
               var isRuleHasValue = rule.includes(':')

               if (isRuleHasValue) {
                   ruleInfo = rule.split(':');
                   rule = ruleInfo[0];
               }
               var ruleFunc = validatorRules[rule];

               if (isRuleHasValue) {
                   ruleFunc = ruleFunc(ruleInfo[1]);
               }

               if (Array.isArray(formRules[input.name])) {
                   formRules[input.name].push(ruleFunc);
               } else {
                   formRules[input.name] = [ruleFunc];
               }
           }
           //Lắng nghe sự kiện để valadate(blur,change,...)
           input.onblur = handleValidate;
       }
       //Hàm thực hiện validate
       function handleValidate(event) {
           var rules = formRules[event.target.name];
           var errorMessage;

           rules.find(function (rule) {
               errorMessage = rule(event.target.value)
               return errorMessage;
           });
           //Nếu có lỗi thì hiển thị message lỗi ra UI
           if (errorMessage) {
               var formGroup = getParent(event.target, '.form-group')
               console.log(formGroup)

           }
       }
   }
   // console.log(formRules)
