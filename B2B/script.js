fetch('dialCode.json')
    .then((data) => data.json())
    .then((resp) => data.country_data = resp);
let data = {
    country_data: ''
}

$(document).ready(function () {

    $('input[readonly]').on({ 'click': focused })
    function focused() {
        let current_select_box = $(this).parent().parent();
        if (current_select_box.find('.optionBox').is(':visible')) {
            current_select_box.find('.optionBox').hide(300);
            current_select_box.find('.optionBox').closest('.input').css('border-radius', 'var(--radius)')
        }
        else {
            current_select_box.find('.optionBox').show(300);
            current_select_box.find('.optionBox').closest('.input').css('border-radius', 'var(--radius) var(--radius) 0px 0px');
        }
        current_select_box.find('.option').off('click')
        current_select_box.find('.option').on({
            'click': function () {
                current_select_box.find('.optionBox span.selected').removeClass('selected');
                current_select_box.find('.optionBox').closest('.input').css('border-radius', 'var(--radius)')
                $(this).addClass('selected');
                current_select_box.find('.selectBoxDisplay').val($(this).text());
                current_select_box.find('.optionBox').hide(300);
                current_select_box.find('input').change()
            }
        });
    }
    var typing;
    function typingstopped(inpt, more) {
        let input = inpt;
        clearTimeout(typing);
        typing = setTimeout(function () {
            let text = input.val().toLowerCase();
            text = text.replace(/[!@#$%\^&*)(+=._-]/g, '');
            let searchFor = $(input).attr('data-searchFor').split(' ');
            let searchForOne = searchFor[0], searchForTwo = searchFor[1];
            let html = ''
            let regEx = new RegExp(text, 'gi');

            let searchData = input.attr('data-searchData');
            for (const iterator of data[searchData]) {
                if (regEx.test(iterator[searchForOne]) || regEx.test(iterator[searchForTwo])) {
                    let moreHtml = '';
                    if (more != '') {
                        let x = input.attr('data-moreHtml');
                        moreHtml = `<span>${iterator[x]}</span>`
                    }
                    html += auto_complete(iterator[searchForOne].replace(regEx, data => `<mark class='mark'>${data}</mark>`), iterator[searchForTwo].replace(regEx, data => `<mark class='mark'>${data}</mark>`))
                    function auto_complete(c, co) {
                        return `<div class="auto_complete"><span>${c}</span><span>${co}</span>${moreHtml}</div>`;
                    }
                }
            }
            input.closest('.input').find('.auto_complete_box').htmll(html);
            if (text == '') {
                html = '';
                input.parent().find('.auto_complete_box').css({ 'display': 'none' });
                input.parent().css({ 'border-radius': 'var(--radius)' })
            }
            else {
                input.parent().find('.auto_complete_box').css({ 'display': 'block' }).htmll(html)
                input.parent().css({ 'border-radius': 'var(--radius) var(--radius) 0px 0px' })
            }
            $('.auto_complete').click(function () {
                input.val($(this).children().eq(0).text())
                $(this).parent().css({ 'display': 'none' })
                input.parent().css({ 'border-radius': 'var(--radius)' })
            })
        }, 500)
    }
    function inputClicked() {
        $('.auto_complete_box').css({ 'display': 'none' });
        $('.input').css({ 'border-radius': 'var(--radius)' })
    }
    $('input.autofill').on({
        'input': function () { typingstopped($(this), $(this).attr('data-moreHtml')) },
        'click': inputClicked
    });


    function nextPage() {
        let validation;
        let requiredInput = $('.details').find('[data-valid]');

        for (let i = 0; i < requiredInput.length; i++) {
            if($(requiredInput[i]).prop("tagName") == 'INPUT' && $(requiredInput[i]).attr('data-type')=='address'){
                let element = $(requiredInput[i]);
                let dataType = element.attr('data-type');
                let result = validateRule(dataType, element)

                if (result.res == false) {
                    validation = false;
                    element.closest('.input').addClass('invalidRegex');
                    element.closest('.input').append(`<span class="regexError">${result.error}</span>`);
                    break;
                }
                else {
                    validation = true;
                    element.closest('.input').removeClass('invalidRegex');
                    element.closest('.input').find(".regexError").remove();
                };

            }
            else if ($(requiredInput[i]).prop("tagName") == 'INPUT' && !$(requiredInput[i]).prop('class').includes('selectBoxDisplay')) {
                let element = $(requiredInput[i]);
                let dataType = element.attr('data-type')
                let result = validateRule(dataType, element)

                if (result.res == false) {
                    validation = false;
                    element.closest('.input').addClass('invalidRegex');
                    element.closest('.input').append(`<span class="regexError">${result.error}</span>`);
                    break;
                }
                else {
                    validation = true;
                    element.closest('.input').removeClass('invalidRegex');
                    element.closest('.input').find(".regexError").remove();
                };

            }
            else if ($(requiredInput[i]).attr('class').includes('selected-date')) {
                let element = $(requiredInput[i]);
                let dataType = element.attr('data-type')
                let result = validateRule(dataType, element)
                if (result.res == false) {
                    validation = false;
                    element.closest('.input').addClass('invalidRegex');
                    element.closest('.input').append(`<span class="regexError">${result.error}</span>`);
                    break;
                }
                else {
                    validation = true;
                    element.closest('.input').removeClass('invalidRegex');
                    element.closest('.input').find(".regexError").remove();
                };
            }
            else if ($(requiredInput[i]).attr('class').includes('selectBoxDisplay')) {
                let element = $(requiredInput[i]);
                let dataType = element.attr('data-type')
                let result = validateRule(dataType, element)
                if (element.val() == 'Select') {
                    validation = false;
                    element.closest('.input').addClass('invalidRegex');
                    element.closest('.input').append(`<span class="regexError">${result.error}</span>`);
                    break;
                }
                if (result.res == false) {
                    validation = false;
                    element.closest('.input').addClass('invalidRegex');
                    element.closest('.input').append(`<span class="regexError">${result.error}</span>`);
                    break;
                }
                else {
                    validation = true;
                    element.closest('.input').removeClass('invalidRegex');
                    element.closest('.input').find(".regexError").remove();
                };
            }
            else if ($(requiredInput[i]).attr('class').includes('T-C')) {
                validation = $(requiredInput[i]).attr('data-valid') == "true" ? true : false;
                element = $(requiredInput[i]);
                if (validation == false) {
                    element.addClass('invalidRegex');
                    element.append(`<span class="regexError" style='left: 50%;transform:translateX(-50%);'>Checkbox IS Required</span>`);
                    break;
                }
                else {
                    element.removeClass('invalidRegex');
                    element.find(".regexError").remove();
                };
            }
            else if ($(requiredInput[i]).attr('class').includes('flight') || $(requiredInput[i]).attr('class').includes('hotel') || $(requiredInput[i]).attr('class').includes('f_h_both')) {
                validation = $(requiredInput[i]).attr('data-valid') == "true" ? true : false;
            }
            else if($(requiredInput[i]).prop('tagName') == 'FIELDSET'){
                let element = $(requiredInput[i]);
                if($('fieldset #ReceiveNow:checked,fieldset #ReceiveLater:checked').length == 0){
                    validation = false;
                    element.addClass('invalidRegex');
                    element.append(`<span class="regexError">Select A Time</span>`);
                    break;
                }
                else {
                    validation = true;
                    element.removeClass('invalidRegex');
                    element.find(".regexError").remove();
                };
            }
        }
       if (validation != false) {
            proceed();
        }
    }
    function validateRule(type, selector,) {
        const exp = {
            name: /^([a-zA-Z_]+\s)*[a-zA-Z_]+(\.?\s+[a-zA-Z_]+)*(\.?\s+[a-zA-Z_]+)*\.?$/i,
            code: /^[\w\d\-\/\\,+]+$/i,
            number: /^\d+$/,
            numbAlpha: /^[\w\d]+$/i,
            contactNumber:/^\d{9,11}$/,
            email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/,
            date: /^(0?[1-9]|[1-2][0-9]|3[0-1])-(0?[1-9]|1[0-2])-\d{4}$/,
            select: /^(?!Select$).+$/,
            address:/^[\w\d\s\-\/\#\\\.\,]+$/i,
            error: "Invalid"
        }
        type = type;
        text = selector.prop("tagName") == "INPUT" ? selector.val() : selector.text();
        if (type != 'bypass') {
            let x = exp[type].test(text);

            if (x == true) {
                return { res: true}
            }
            else {
                return { res: false, error: exp[`error`] }
            }
        }

    }
    function proceed() {
        var UniqCode = "";
        var char = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'];
        for (var i = 0; i < 5; i++) {
            var randomIndex = Math.floor(Math.random() * char[0].length);
            UniqCode += char[0][randomIndex];
        }
        var details = `{
            "UniqCode":"${UniqCode}",
            "title":"${$('#title').val()}",
            "fName":"${$('#fName').val()}",
            "lName":"${$('#lName').val()}",
            "cCode":"${$('#cCode').val()}",
            "number":"${$(`#number`).val()}",
            "mail":"${$(`#mail`).val()}",
            "rAddress":"${$(`#rAddress`).val()}",
            "address2":"${$(`#address2`).val()}",
            "pinc":"${$(`#pinc`).val()}",
            "number2":"${$(`#number2`).val()}",
            "skype":"${$(`#skype`).val()}",
            "country":"${$(`#country`).val()}",
            "aName":"${$(`#aName`).val()}",
            "pan":"${$(`#pan`).val()}",
            "aNumber":"${$(`#aNumber`).val()}",
            "agencyadd":"${$(`#agencyadd`).val()}",
            "agencyadd2":"${$(`#agencyadd2`).val()}",
            "aPinc":"${$(`#aPinc`).val()}",
            "aCountry":"${$(`#aCountry`).val()}",
            "city":"${$(`#city`).val()}",
            "state":"${$(`#state`).val()}",
            "fax":"${$(`#fax`).val()}",
            "bussinesstype":"${$(`#busstype`).val()}",
            "yib":"${$(`#yib`).val()}",
            "bookvol":"${$(`#bookvol`).val()}"
            }
        `;
        $.ajax({
            url:"registered.php",
            method:"post",
            data:{data:details},
            success: function (result) {
                if (result == "registered") {
                    $('.confirmBox').fadeIn('300').css("display",'flex');
                    console.log(result);
                }
            }
        })
    }
    $('.button[type=submit]').click(e=>{
        e.preventDefault();
        nextPage();
    });
});