let data = {
    airports: '',
    country_data: ''
}
fetch('airports.json')
    .then((data) => data.json())
    .then((resp) => data.airports = resp);
fetch('dialCode.json')
    .then((data) => data.json())
    .then((resp) => data.country_data = resp);

$(document).ready(function () {
    // Type Selecting
    $('.flight').click(function () {
        $('.flight_box').css('display', 'block');
        $('.hotelBox').css('display', 'none');
        $('.flight_box').attr({ 'data-active': 'true' });
        $('.hotelBox').removeAttr('data-active');
        $('.flight_box').find('input').attr({ 'data-required': 'true', 'data-valid': 'false' });
        $('.flight_box').find('.datepicker .selected-date').attr({ 'data-required': 'true', 'data-valid': 'false' });
        $('.routeBoxHead').text('Route');

        $('.hotelBox').find('input').removeAttr('data-required data-valid');
        $('.hotelBox').find('.datepicker .selected-date').removeAttr('data-required data-valid');
    });
    $('.hotel').click(function () {
        $('.hotelBox').css('display', 'block');
        $('.flight_box').css('display', 'none');
        $('.hotelBox').attr({ 'data-active': 'true' });
        $('.flight_box').removeAttr('data-active');
        $('.hotelBox').find('input').attr({ 'data-required': 'true', 'data-valid': 'false' })
        $('.hotelBox').find('.datepicker .selected-date').attr({ 'data-required': 'true', 'data-valid': 'false' });
        $('.routeBoxHead').text('Hotel');
        $('.flight_box').find('input').removeAttr('data-required data-valid');
        $('.flight_box').find('.datepicker .selected-date').removeAttr('data-required data-valid');
    });
    $('.f_h_both').click(function () {
        $('.flight_box').css('display', 'block');
        $('.hotelBox').css('display', 'block');
        $('.flight_box').attr({ 'data-active': 'true' });
        $('.hotelBox').attr({ 'data-active': 'true' });
        $('.flight_box').find('input').attr({ 'data-required': 'true', 'data-valid': 'false' });
        $('.flight_box').find('.datepicker .selected-date').attr({ 'data-required': 'true', 'data-valid': 'false' });
        $('.hotelBox').find('input').attr({ 'data-required': 'true', 'data-valid': 'false' })
        $('.hotelBox').find('.datepicker .selected-date').attr({ 'data-required': 'true', 'data-valid': 'false' });
        $('.routeBoxHead').html('<small class="smallheading">Route And Hotel</small>');
    });
    $('.flight,.hotel,.f_h_both').click(function () {
        $('.flight,.hotel,.f_h_both').removeClass('hover');
        $('.flight,.hotel,.f_h_both').removeAttr('data-valid');
        $(this).addClass('hover');
        $(this).attr('data-valid', 'true');
        $('.stepNext').removeClass('not_active')
        $('.stepNext').off({ 'click': nextPage });
        $('.stepNext').on({ 'click': nextPage });
        nextPage()

    });

    // total box sizing
    $('.receipt').click(resizing)
    function resizing() {
        if ($(window).outerWidth() < 991) {
            $('.receipt').toggleClass('fullView');
        }
    }
    // Currency Change
    $('.currency').click(currency);
    function currency(e) {
        e.stopPropagation();
        let currentCurrency = $('[data-currentCurrency]').attr('data-currentCurrency');
        let x = $('[data-currency]');
        for (const obj of x) {
            if ($(obj).attr('data-currency') == currentCurrency) {
                $(obj).css('display', 'none');
            }
            else {
                $(obj).css('display', 'inherit');
            }
        }
        if (currentCurrency == 'inr') {
            currentCurrency = $('[data-currentCurrency]').attr({'data-currentCurrency':'usd','data-currencyType':0});
        }
        else {
            currentCurrency = $('[data-currentCurrency]').attr({'data-currentCurrency':'inr','data-currencyType':1});
        }
    }
    // auto completer
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
            input.closest('.input').find('.auto_complete_box').html(html);
            if (text == '') {
                html = '';
                input.parent().find('.auto_complete_box').css({ 'display': 'none' });
                input.parent().css({ 'border-radius': 'var(--radius)' })
            }
            else {
                input.parent().find('.auto_complete_box').css({ 'display': 'block' }).html(html)
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

    class todayDate {
        constructor() {
            this.currentDate = new Date().getDate()
            this.currentDayNumber = new Date().getDay()
            this.currentYear = new Date().getFullYear()
            this.currentMonth = new Date().getMonth();
            this.currentMonthName = new Date().toLocaleDateString('eng', { month: 'short' });
            this.currentMonthNameFull = new Date().toLocaleDateString('eng', { month: 'long' });
            this.firstDayNumberOFMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
            this.lastDateOFCurrentMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
            this.lastDateOFLastMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();
            this.populatehtml = function () {
                var x = `<div class="days-name">
                    <div class="day-name">s</div>
                    <div class="day-name">m</div>
                    <div class="day-name">t</div>
                    <div class="day-name">w</div>
                    <div class="day-name">t</div>
                    <div class="day-name">f</div>
                    <div class="day-name">s</div>
                </div><div class="days">`;
                for (let i = 0; i < 42; i++) {
                    if (i < this.firstDayNumberOFMonth) {
                        x += `<div class='day'></div>`;
                    }
                    else if (i < this.firstDayNumberOFMonth + this.lastDateOFCurrentMonth) {
                        if (i - this.firstDayNumberOFMonth == this.currentDate - 1) {
                            x += `<div class='day current-day valid'>${i - this.firstDayNumberOFMonth + 1}</div>`;
                        }
                        else {
                            x += `<div class='day valid'>${i - this.firstDayNumberOFMonth + 1}</div>`;
                        }
                    }
                    else {
                        x += `<div class='day'></div>`;
                    }
                }
                x += `</div>`;
                return x;
            }
        }
    }
    class prevDate {
        constructor(date, step, selectedDate) {
            this.todate = date;
            this.premonth = new Date(parseInt(this.todate[2]), parseInt(this.todate[1]) + step - 1, 1).getMonth();
            this.preyear = new Date(parseInt(this.todate[2]), parseInt(this.todate[1]) + step - 1, 1).getFullYear()
            this.predate = new Date(this.preyear, this.premonth, 1);
            this.selectedDate = selectedDate;
            this.preMonthName = new Date(this.preyear, (this.premonth), 1).toLocaleString('eng', { month: 'short' });
            this.preMonthNameFull = new Date(this.preyear, (this.premonth), 1).toLocaleString('eng', { month: 'long' });
            this.firstOfPreMonth = new Date(this.preyear, (this.premonth), 1).getDay();
            this.lastOfPreMonth = new Date(this.preyear, (this.premonth + 1), 0).getDate();
            this.populatehtml = function () {
                var x = ``;
                for (let i = 0; i < 42; i++) {
                    if (i < this.firstOfPreMonth) {
                        x += `<div class='day'></div>`;
                    }
                    else if (i < this.lastOfPreMonth + this.firstOfPreMonth) {
                        if (i - this.firstOfPreMonth + 1 == this.todate[0] && this.preyear == this.todate[2] && this.premonth == parseInt(this.todate[1]) - 1 && i - this.firstOfPreMonth + 1 == this.selectedDate[0] && this.preyear == this.selectedDate[2] && this.premonth == parseInt(this.selectedDate[1]) - 1) {
                            x += `<div class='day valid current-day hover'>${i - this.firstOfPreMonth + 1}</div>`;
                        }
                        else if (i - this.firstOfPreMonth + 1 == this.selectedDate[0] && this.preyear == this.selectedDate[2] && this.premonth == parseInt(this.selectedDate[1]) - 1) {
                            x += `<div class='day valid hover'>${i - this.firstOfPreMonth + 1}</div>`;
                        }
                        else if (i - this.firstOfPreMonth + 1 == this.todate[0] && this.preyear == this.todate[2] && this.premonth == parseInt(this.todate[1]) - 1) {
                            x += `<div class='day valid current-day'>${i - this.firstOfPreMonth + 1}</div>`;
                        }
                        else {
                            x += `<div class='day valid'>${i - this.firstOfPreMonth + 1}</div>`;
                        }
                    }
                    else {
                        x += `<div class='day'></div>`;
                    }
                }
                return x;
            }

        }
    }
    class nextDate {
        constructor(date, step, selectedDate) {
            this.todate = date;
            this.nextmonth = new Date(parseInt(this.todate[2]), parseInt(this.todate[1]) + step - 1, 1).getMonth();
            this.nextyear = new Date(parseInt(this.todate[2]), parseInt(this.todate[1]) + step - 1, 1).getFullYear();
            this.nextdate = new Date(this.nextyear, this.nextmonth, 1);
            this.selectedDate = selectedDate;
            this.nextMonthName = new Date(this.nextyear, (this.nextmonth), 1).toLocaleString('eng', { month: 'short' });
            this.nextMonthNameFull = new Date(this.nextyear, (this.nextmonth), 1).toLocaleString('eng', { month: 'long' });
            this.firstOfNextMonth = new Date(this.nextyear, (this.nextmonth), 1).getDay();
            this.lastOfNextMonth = new Date(this.nextyear, (this.nextmonth + 1), 0).getDate();
            this.populatehtml = function () {
                var x = ``;
                for (let i = 0; i < 42; i++) {
                    if (i < this.firstOfNextMonth) {
                        x += `<div class='day'></div>`;
                    }
                    else if (i < this.lastOfNextMonth + this.firstOfNextMonth) {
                        if (i - this.firstOfNextMonth + 1 == this.selectedDate[0] && this.nextmonth + 1 == selectedDate[1] && this.nextyear == this.selectedDate[2] && i - this.firstOfNextMonth + 1 == this.todate[0] && this.nextmonth == parseInt(this.todate[1]) - 1) {
                            x += `<div class='day valid current-day hover'>${i - this.firstOfNextMonth + 1}</div>`;
                        }
                        else if (i - this.firstOfNextMonth + 1 == this.selectedDate[0] && this.nextmonth + 1 == selectedDate[1] && this.nextyear == this.selectedDate[2]) {
                            x += `<div class='day valid hover'>${i - this.firstOfNextMonth + 1}</div>`;
                        }
                        else if (i - this.firstOfNextMonth + 1 == this.todate[0] && this.nextmonth == parseInt(this.todate[1]) - 1 && this.nextyear == this.todate[2]) {
                            x += `<div class='day valid current-day'>${i - this.firstOfNextMonth + 1}</div>`;
                        }
                        else {
                            x += `<div class='day valid'>${i - this.firstOfNextMonth + 1}</div>`;
                        }
                    }
                    else {
                        x += `<div class='day'></div>`;
                    }
                }
                return x;
            }

        }
    }
    class makeDate {
        constructor(year, month, selectdate, todate) {
            this.year = new Date(year, month, 1).getFullYear();
            this.month = new Date(year, month, 1).getMonth() + 1;
            this.date = new Date(year, month, 1).getDate();
            this.monthName = new Date(year, month, 1).toLocaleString('eng', { month: 'short' });
            this.monthNameFull = new Date(year, month, 1).toLocaleString('eng', { month: 'long' });
            this.firstDayOfMonth = new Date(year, month, 1).getDay();
            this.lastDayOfMonth = new Date(year, month + 1, 0).getDate();
            this.selectedDate = selectdate;
            this.todate = todate;
            this.populatehtml = function () {
                var x = ``;
                x += `<div class="days-name">
                <div class="day-name">s</div>
                <div class="day-name">m</div>
                <div class="day-name">t</div>
                <div class="day-name">w</div>
                <div class="day-name">t</div>
                <div class="day-name">f</div>
                <div class="day-name">s</div>
            </div><div class='days'>`;
                for (let i = 0; i < 42; i++) {

                    if (i < this.firstDayOfMonth) {
                        x += `<div class='day'></div>`;
                    }
                    else if (i < this.lastDayOfMonth + this.firstDayOfMonth) {
                        if (i - this.firstDayOfMonth + 1 == this.selectedDate[0] && this.month == this.selectedDate[1] && this.year == this.selectedDate[2] && i - this.firstDayOfMonth + 1 == this.todate[0] && this.month == this.todate[1]) {
                            x += `<div class='day valid current-day hover'>${i - this.firstDayOfMonth + 1}</div>`;
                        }
                        else if (i - this.firstDayOfMonth + 1 == this.selectedDate[0] && this.month == this.selectedDate[1] && this.year == this.selectedDate[2]) {
                            x += `<div class='day valid hover'>${i - this.firstDayOfMonth + 1}</div>`;
                        }
                        else if (i - this.firstDayOfMonth + 1 == this.todate[0] && this.month == this.todate[1] && this.year == this.todate[2]) {
                            x += `<div class='day valid current-day'>${i - this.firstDayOfMonth + 1}</div>`;//he
                        }
                        else {
                            x += `<div class='day valid'>${i - this.firstDayOfMonth + 1}</div>`;
                        }
                    }
                    else {
                        x += `<div class='day'></div>`;
                    }
                }
                x += `</div>`;
                return x;
            }
            this.steps = function () {
                let currentYear = new Date().getFullYear();
                let currentMonth = new Date().getMonth() + 1;
                let monthsStep = currentMonth - this.month
                let yearsStep = currentYear <= this.year ?
                    ((this.year - currentYear) * 12) - monthsStep :
                    `-${((currentYear - this.year) * 12) + monthsStep}`;
                return yearsStep;
            }

        }
    }
    dateUpdate($('.datepicker'))
    $('.next').click(next);
    $('.prev').click(prev);
    $('.mandy').click(years);
    $('.selected-date').click(calanderToggle);

    function selectDay() {
        $(this).parent().find('.day.valid').removeClass('hover')
        $(this).addClass('hover')
        var changemy = $(this).closest('.datepicker').find('.mandy').attr('data-changemy').split('-');
        var selectdate = parseInt($(this).text()) < 10 ? 0 + $(this).text() : $(this).text();
        $(this).closest('.datepicker').find('.mandy').attr('data-selected-date', `${selectdate}-${changemy[0]}-${changemy[1]}`)
        $(this).closest('.datepicker').find('.selected-date').text(`${selectdate}-${changemy[2]}-${changemy[1]}`)
        $(this).closest('.datepicker').find('.calander').toggle(300);
        $(this).closest('.input').css('border-radius', 'var(--radius)')
    }
    function dateUpdate(selctor) {
        var x = new todayDate();
        selctor.find('.mandy').attr({
            'data-step': 0,
            'data-todate': `${x.currentDate < 10 ? '0' + x.currentDate : x.currentDate}-${x.currentMonth + 1 < 10 ? '0' + (x.currentMonth + 1) : x.currentMonth + 1}-${x.currentYear}`,
            'data-selected-date': `00-00-0000`,
            'data-changemy': `${x.currentMonth + 1 < 10 ? '0' + (x.currentMonth + 1) : x.currentMonth + 1}-${x.currentYear}-${x.currentMonthNameFull}`,
            'data-set': 'days',
            'data-changey': `${x.currentYear}`
        }).text(`${x.currentMonthName}-${x.currentYear}`);
        selctor.find('.selected-date').text('Select A Date');
        selctor.find('.calander').append(x.populatehtml());
        selctor.find('.day.valid').click(selectDay);
    }
    function next() {
        let datepicker = $(this).closest('.datepicker');
        if (datepicker.find('.mandy').attr('data-set') == 'days') {
            datepicker.find('.mandy').attr('data-step', parseInt(datepicker.find('.mandy').attr('data-step')) + 1)
            var todayDateArray = datepicker.find('.mandy').attr('data-todate').split('-');
            var step = parseInt(datepicker.find('.mandy').attr('data-step'));
            var selectedDate = datepicker.find('.mandy').attr('data-selected-date').split('-');
            var x = new nextDate(todayDateArray, step, selectedDate);
            datepicker.find('.days').html(x.populatehtml())
            datepicker.find('.mandy').text(`${x.nextMonthName}-${x.nextyear}`)
            datepicker.find('.mandy').attr('data-changemy', `${x.nextmonth + 1 < 10 ? '0' + (x.nextmonth + 1) : x.nextmonth + 1}-${x.nextyear}-${x.nextMonthNameFull}`)
            datepicker.find('.day.valid').click(selectDay);
        }
        else {
            datepicker.find('.mandy').attr('data-changey', datepicker.find('.calander-years .calander-year:last').text());

            let html = '<div class="calander-years">';

            for (let i = parseInt(datepicker.find('.mandy').attr('data-changey')); i < parseInt(datepicker.find('.mandy').attr('data-changey')) + 12; i++) {
                if ((parseInt(datepicker.find('.mandy').attr('data-changey')) + (i)) - parseInt(datepicker.find('.mandy').attr('data-changey')) == datepicker.find('.mandy').attr('data-selected-date').split('-')[2]) {
                    html += `<div class="calander-year hover">${(parseInt(datepicker.find('.mandy').attr('data-changey')) + (i)) - parseInt(datepicker.find('.mandy').attr('data-changey'))}</div>`;
                }
                else {
                    html += `<div class="calander-year">${(parseInt(datepicker.find('.mandy').attr('data-changey')) + (i)) - parseInt(datepicker.find('.mandy').attr('data-changey'))}</div>`;
                }
            }
            html += '</div>'
            datepicker.find('.calander-years').remove();
            datepicker.find('.calander').append(html);
            datepicker.find('.calander-year').click(yearselect);
        }
    }
    function prev() {
        let datepicker = $(this).closest('.datepicker');
        if (datepicker.find('.mandy').attr('data-set') == 'days') {
            datepicker.find('.mandy').attr('data-step', parseInt(datepicker.find('.mandy').attr('data-step')) - 1)
            var todayDateArray = datepicker.find('.mandy').attr('data-todate').split('-');
            var step = parseInt(datepicker.find('.mandy').attr('data-step'));
            var selectedDate = datepicker.find('.mandy').attr('data-selected-date').split('-');
            var x = new prevDate(todayDateArray, step, selectedDate);
            datepicker.find('.days').html(x.populatehtml())
            datepicker.find('.mandy').text(`${x.preMonthName}-${x.preyear}`)
            datepicker.find('.mandy').attr('data-changemy', `${x.premonth + 1 < 10 ? '0' + (x.premonth + 1) : x.premonth + 1}-${x.preyear}-${x.preMonthNameFull}`)
            datepicker.find('.day.valid').click(selectDay);
        }
        else {
            datepicker.find('.mandy').attr('data-changey', datepicker.find('.calander-years .calander-year:first').text());
            let html = '<div class="calander-years">';
            for (let i = parseInt(datepicker.find('.mandy').attr('data-changey')); i < parseInt(datepicker.find('.mandy').attr('data-changey')) + 12; i++) {
                if ((parseInt(datepicker.find('.mandy').attr('data-changey')) - (parseInt(datepicker.find('.mandy').attr('data-changey')) - i + 11)) == datepicker.find('.mandy').attr('data-selected-date').split('-')[2]) {
                    html += `<div class="calander-year hover">${parseInt(datepicker.find('.mandy').attr('data-changey')) - (parseInt(datepicker.find('.mandy').attr('data-changey')) - i + 11)}</div>`;
                }
                else {
                    html += `<div class="calander-year">${parseInt(datepicker.find('.mandy').attr('data-changey')) - (parseInt(datepicker.find('.mandy').attr('data-changey')) - i + 11)}</div>`;
                }
            }
            html += '</div>'
            datepicker.find('.calander-years').remove();
            datepicker.find('.calander').append(html);
            datepicker.find('.calander-year').click(yearselect);
        }
    }
    function years() {
        let datepicker = $(this).closest('.datepicker');
        datepicker.find('.mandy').attr('data-set', 'year');
        datepicker.find('.days').remove();
        datepicker.find('.days-name').remove();
        let html = '<div class="calander-years">';
        for (let i = parseInt(datepicker.find('.mandy').attr('data-changey')); i < parseInt(datepicker.find('.mandy').attr('data-changey')) + 12; i++) {
            if ((parseInt(datepicker.find('.mandy').attr('data-changey')) - (parseInt(datepicker.find('.mandy').attr('data-changey')) - i + 11)) == datepicker.find('.mandy').attr('data-selected-date').split('-')[2]) {
                html += `<div class="calander-year hover">${parseInt(datepicker.find('.mandy').attr('data-changey')) - (parseInt(datepicker.find('.mandy').attr('data-changey')) - i + 11)}</div>`;
            }
            else {
                html += `<div class="calander-year">${parseInt(datepicker.find('.mandy').attr('data-changey')) - (parseInt(datepicker.find('.mandy').attr('data-changey')) - i + 11)}</div>`;
            }
        }
        html += '</div>'
        datepicker.find('.calander-years').remove();
        datepicker.find('.calander').append(html);
        datepicker.find('.calander-year').click(yearselect);
    }
    function yearselect() {
        let datepicker = $(this).closest('.datepicker');
        let elem = $(this);
        let month = datepicker.find('.mandy').attr('data-changemy').split('-')[0] - 1;
        let selectedDate = datepicker.find('.mandy').attr('data-selected-date').split('-');
        let todate = datepicker.find('.mandy').attr('data-todate').split('-');
        let date = new makeDate(elem.text(), month, selectedDate, todate);
        datepicker.find('.mandy').attr('data-changemy', `${(month + 1) < 10 ? '0' + (month + 1) : (month + 1)}-${date.year}-${date.monthNameFull}`)
        datepicker.find('.mandy').attr('data-changey', datepicker.find('.mandy').attr("data-changemy").split('-')[1]);
        datepicker.find('.mandy').text(date.monthName + '-' + elem.text());
        datepicker.find('.calander-years').remove();
        datepicker.find('.calander').append(date.populatehtml());
        datepicker.find('.mandy').attr('data-set', 'days')
        datepicker.find('.mandy').attr('data-step', date.steps())
        datepicker.find('.day.valid').click(selectDay);
    }
    function calanderToggle() {
        if ($(this).closest('.datepicker').find('.calander').is(':visible')) {
            $(this).closest('.datepicker').find('.calander').hide(300);
            $(this).closest('.input').css('border-radius', 'var(--radius)')
        }
        else {
            $(this).closest('.datepicker').find('.calander').show(300);
            $(this).closest('.input').css('border-radius', 'var(--radius) var(--radius) 0px 0px')
        }
    }
    // Rout Style selecting
    $('.route_style span').click(function () {
        $('.route_style span').removeClass('route_style_active');
        $(this).addClass('route_style_active');
    });

    $('.return_trip').click(returnTrip);
    $('.one_way').click(oneWay);
    $('.multi_trip').click(multiTrip);

    function htmlForRouteStyle(elem) {
        html = `<div class="route">
                    <div class="input_box">
                        <h3 class="routeHead"><span class="routeNumber">Route 1</span></h3>
                        <div class="input">
                            <input type="text" class="autofill" placeholder=" " id="origin1" autocomplete="off" data-required="true" data-type="code" data-valid="false" data-searchFor="code city" data-searchData="airports" data-moreHtml="name">
                            <label class="placeholder" for="origin1">Origin</label>
                            <div class="auto_complete_box">
                            </div>
                        </div>
                        <div class="input">
                            <input type="text" class="autofill block-tab" placeholder=" " id="destination1" autocomplete="off" data-required="true" data-type="code" data-valid="false" data-searchFor="code city" data-searchData="airports" data-moreHtml="name">
                            <label class="placeholder" for="destination1">Destination</label>
                            <div class="auto_complete_box">
                            </div>
                        </div>
                        </div>
                        <div class="input_box">
                            <div class="input">
                                <div class="datepicker">
                                    <div class="selected-date" data-valid="false" data-type="date"></div>
                                    <div class="calander">
                                        <div class="calander-header">
                                            <div class="prev img_icon icon_seventeen"></div>
                                            <div class="mandy" id='date1'></div>
                                            <div class="next img_icon icon_eightteen"></div>
                                        </div>
                                    </div>
                                </div>
                                <label class="placeholder">Departure</label>
                            </div>`;
        if (elem.attr('class').includes('one_way')) {
            html += `</div></div>`;
            return html;
        }
        else if (elem.attr('class').includes('return_trip')) {
            html += `<div class="input" style="display: block;">
                        <div class="datepicker">
                            <div class="selected-date" data-valid="false" data-type="date"></div>
                            <div class="calander">
                                <div class="calander-header">
                                    <div class="prev img_icon icon_seventeen"></div>
                                    <div class="mandy" id="return_date"></div>
                                    <div class="next img_icon icon_eightteen"></div>
                                </div>
                            </div>
                        </div>
                        <label class="placeholder">Return Date</label>
                    </div>
                </div></div>`;
            return html;
        }
        else if (elem.attr('class').includes('multi_trip')) {
            html += `</div></div>
            <div class="input_box add_button_box">
                <div class="input button add_more_route" style='margin-top:0px;'>
                    Add More Route
                </div>
            </div>`;
            return html;
        }
    }
    function returnTrip() {
        $('.rout_style_box').html(htmlForRouteStyle($(this)))
        dateUpdate($('.route .input_box .datepicker'));

        $('.next').off({ 'click': next })
        $('.next').on({ 'click': next })
        $('.prev').off({ 'click': prev })
        $('.prev').on({ 'click': prev })
        $('.mandy').off({ 'click': years });
        $('.mandy').on({ 'click': years });
        $('.selected-date').off({ 'click': calanderToggle });
        $('.selected-date').on({ 'click': calanderToggle });
        $('input.autofill').off({ 'input': typingstopped, 'click': inputClicked })
        $('input.autofill').on({
            'input': function () { typingstopped($(this), $(this).attr('data-moreHtml')) },
            'click': inputClicked
        });
        $('.block-tab').on('keydown', blockTab);
    }

    function oneWay() {
        let routelength=$('.route').length;
        $('.rout_style_box').html(htmlForRouteStyle($(this)))
        dateUpdate($('.route .input_box .datepicker'));
        $('.next').off({ 'click': next })
        $('.next').on({ 'click': next })
        $('.prev').off({ 'click': prev })
        $('.prev').on({ 'click': prev })
        $('.mandy').off({ 'click': years });
        $('.mandy').on({ 'click': years });
        $('.selected-date').off({ 'click': calanderToggle });
        $('.selected-date').on({ 'click': calanderToggle });
        $('input').off({ 'input': typingstopped, 'click': inputClicked })
        $('input.autofill').on({
            'input': function () { typingstopped($(this), $(this).attr('data-moreHtml')) },
            'click': inputClicked
        });
        $('.block-tab').on('keydown', blockTab);
    }

    function multiTrip() {
        $('.rout_style_box').html(htmlForRouteStyle($(this)));
        $('.rout_style_box').find('.routeHead').css('opacity', '1')
        dateUpdate($('.route .input_box .datepicker'));
        $('.next').off({ 'click': next })
        $('.next').on({ 'click': next })
        $('.prev').off({ 'click': prev })
        $('.prev').on({ 'click': prev })
        $('.mandy').off({ 'click': years });
        $('.mandy').on({ 'click': years });
        $('.selected-date').off({ 'click': calanderToggle });
        $('.selected-date').on({ 'click': calanderToggle });
        $('input.autofill').off({ 'input': typingstopped, 'click': inputClicked })
        $('input.autofill').on({
            'input': function () { typingstopped($(this), $(this).attr('data-moreHtml')) },
            'click': inputClicked
        });
        $('.add_more_route').click(addRoute);
        $('.block-tab').on('keydown', blockTab);
    }

    function addRoute() {
        var x = $('.flight_box .route').length;
        if (x < 5) {
            var html = `<div class="route" style="display:none;">
            <div class="input_box">
                <h3 class="routeHead">Route 1</h3>
                <div class="input">
                    <input type="text" placeholder=" " class="autofill" id="origin${x+1}" autocomplete="off" data-required="true" data-type="code" data-valid="false" data-searchFor="code city" data-searchData="airports" data-moreHtml="name">
                    <label class="placeholder" for="origin${x+1}" autocomplete="off">Origin</label>
                    <div class="auto_complete_box">
                    </div>
                </div>
                <div class="input">
                    <input type="text" placeholder=" " class="autofill block-tab" id="destination${x+1}" autocomplete="off" data-required="true" data-type="code" data-valid="false" data-searchFor="code city" data-searchData="airports" data-moreHtml="name">
                    <label class="placeholder" for="destination${x+1}">Destination</label>
                    <div class="auto_complete_box">
                    </div>
                </div>
                </div>
                <div class="input_box">
                    <div class="input">
                        <div class="datepicker">
                            <div class="selected-date" data-valid="false" data-type="date"></div>
                            <div class="calander">
                                <div class="calander-header">
                                    <div class="prev img_icon icon_seventeen"></div>
                                    <div class="mandy" id='date${x+1}'></div>
                                    <div class="next img_icon icon_eightteen"></div>
                                </div>
                            </div>
                        </div>
                        <label class="placeholder">Departure</label>
                    </div></div></div>`;
            $(html).insertBefore('.flight_box .add_button_box');
            $('.rout_style_box').find('.routeHead').last().html(`<span class="routeNumber">Route ${x + 1}</span><span class='deleteRoute'>&#10006;</span>`)
            $('.rout_style_box').find('.routeHead:last').css('opacity', '1')
            $('.rout_style_box').find('.route:last').show(300)

            dateUpdate($('.route .datepicker:last'));
            $('.next').off({ 'click': next })
            $('.next').on({ 'click': next })
            $('.prev').off({ 'click': prev })
            $('.prev').on({ 'click': prev })
            $('.mandy').off({ 'click': years });
            $('.mandy').on({ 'click': years });
            $('.selected-date').off({ 'click': calanderToggle });
            $('.selected-date').on({ 'click': calanderToggle });
            $('input.autofill').off({ 'input': typingstopped, 'click': inputClicked });
            $('input.autofill').on({
                'input': function () { typingstopped($(this), $(this).attr('data-moreHtml')) },
                'click': inputClicked
            });
            $('.deleteRoute').off({ 'click': deleteRoute });
            $('.deleteRoute').on({ 'click': deleteRoute });
            updateTotal();
            $('.block-tab').off('keydown', blockTab);
            $('.block-tab').on('keydown', blockTab);
        }
    }

    $('.hotelBox .add_more_hotel').click(addHotel);
    function addHotel() {
        var x = $('.hotelBox .hotelUnit').length;
        if (x < 5) {
            var html = `<div class="hotelUnit"  style="display:none;">
            <div class="input_box">
                <h3 class="hotelHead" style="opacity: 1;"><span class="hotelNumber"></span></h3>
                <div class="input">
                    <div class="datepicker">
                        <div class="selected-date" data-valid="false" data-type="date"></div>
                        <div class="calander">
                            <div class="calander-header">
                                <div class="prev img_icon icon_seventeen"></div>
                                <div class="mandy" id="checkIn${x+1}"></div>
                                <div class="next img_icon icon_eightteen"></div>
                            </div>
                        </div>
                    </div>
                    <label class="placeholder">Check In</label>
                </div>
                <div class="input">
                    <div class="datepicker">
                        <div class="selected-date" data-valid="false" data-type="date"></div>
                        <div class="calander">
                            <div class="calander-header">
                                <div class="prev img_icon icon_seventeen"></div>
                                <div class="mandy" id="checkOut${x+1}"></div>
                                <div class="next img_icon icon_eightteen"></div>
                            </div>
                        </div>
                    </div>
                    <label class="placeholder">Check Out</label>
                </div>
            </div>
            <div class="input_box">
                <div class="input">
                    <input type="text" class="autofill block-tab" placeholder=" " id="hotelCity${x + 1}" autocomplete="off" data-required="true" data-type="name" data-valid="false" data-searchFor="city code" data-searchData="airports" data-moreHtml=''>
                    <label class="placeholder" for="hotelCity${x + 1}">City</label>
                    <div class="auto_complete_box"></div>
                </div>
            </div>
        </div>`;
            $(html).insertBefore('.hotelBox .add_button_box');
            $('.hotelBox').find('.hotelHead').last().html(`<span class="hotelNumber">Hotel ${x + 1}</span><span class='deleteHotel'>&#10006;</span>`)
            $('.hotelBox').find('.hotelHead:last').css('opacity', '1')
            $('.hotelBox').find('.hotelUnit:last').show(300)
            dateUpdate($('.hotelUnit:last .datepicker'));
            $('.next').off({ 'click': next })
            $('.next').on({ 'click': next })
            $('.prev').off({ 'click': prev })
            $('.prev').on({ 'click': prev })
            $('.mandy').off({ 'click': years });
            $('.mandy').on({ 'click': years });
            $('.selected-date').off({ 'click': calanderToggle });
            $('.selected-date').on({ 'click': calanderToggle });
            $('input.autofill').off({ 'input': typingstopped, 'click': inputClicked })
            $('input.autofill').on({
                'input': function () { typingstopped($(this), $(this).attr('data-moreHtml')) },
                'click': inputClicked
            });
            $('.deleteHotel').on({ 'click': deleteRoute })
            updateTotal();
            $('.block-tab').off('keydown', blockTab);
            $('.block-tab').on('keydown', blockTab);
        }

    }
    $('.add_more_passanger').click(addPassenger)
    function addPassenger() {
        var x = $('.allPassenger .passenger').length;
        if (x < 5) {
            var html = `<div class="passenger" style="display:none">
            <h3 class="passengerNumber"><span class="PassNumber">Passenger ${x + 1}</span><span class='deletePass'>&#10006;</span></h3>
            <div class="input">
                <div class="selectBox">
                    <div class="select_box_head">
                        <input type="text" id="title${x+1}" class="selectBoxDisplay" value="Select" data-type="select" data-required="true" data-valid="false" readonly>
                        <label class="selectorPlaceholder">Title</label>
                    </div>
                    <div class="optionBox" style="display: none;">
                        <span class="option">Mr</span>
                        <span class="option">Mrs</span>
                        <span class="option">Ms</span>
                        <span class="option">Miss</span>
                        <span class="option">Mstr</span>
                    </div>
                </div>
            </div>
            <div class="input">
                <input type="text" placeholder=" " id="fName${x + 1}" autocomplete="off" data-type="name" data-required="true" data-valid="false">
                <label class="placeholder" for="fName${x + 1}">First Name</label>
            </div>
            <div class="input">
                <input type="text" placeholder=" " id="lName${x + 1}" autocomplete="off" data-type="name">
                <label class="placeholder" for="lName${x + 1}">Last Name</label>
            </div>
            <div class="input">
                <div class="datepicker">
                    <div class="selected-date" data-type="date" data-required="true" data-valid="false"></div>
                    <div class="calander">
                        <div class="calander-header">
                            <div class="prev img_icon icon_seventeen"></div>
                            <div class="mandy" id='DOB${x+1}'></div>
                            <div class="next img_icon icon_eightteen"></div>
                        </div>
                    </div>
                </div>
                <label class="placeholder">D.O.B.</label>
            </div>
            <div class="input">
                <input type="text" class="autofill block-tab" placeholder=" " id="nation${x + 1}" autocomplete="off" data-required="true" data-valid="false" data-type="name" data-searchFor="name code" data-searchData="country_data" data-moreHtml=''>
                <label class="placeholder" for="nation${x + 1}">Nationality</label>
                <div class="auto_complete_box"></div>
            </div>
        </div>`;
            $(html).insertBefore('.passenger_box .add_button_box');
            $('.allPassenger').find('.passenger:last').show(300)
            dateUpdate($('.passenger:last .datepicker'));
            $('.next').off({ 'click': next })
            $('.next').on({ 'click': next })
            $('.prev').off({ 'click': prev })
            $('.prev').on({ 'click': prev })
            $('.mandy').off({ 'click': years });
            $('.mandy').on({ 'click': years });
            $('.selected-date').off({ 'click': calanderToggle });
            $('.selected-date').on({ 'click': calanderToggle });
            $('input.autofill').off({ 'input': function () { typingstopped }, 'click': inputClicked })
            $('input.autofill').on({
                'input': function () { typingstopped($(this), $(this).attr('data-moreHtml')) },
                'click': inputClicked
            });
            $('.deletepass').on({ 'click': deleteRoute })
            $('input[readonly]').off({ 'click': focused })
            $('input[readonly]').on({ 'click': focused })
            updateTotal();
            $('.block-tab').off('keydown', blockTab);
            $('.block-tab').on('keydown', blockTab);
        }

    }

    function deleteRoute() {
        if ($(this).closest('.route')) {
            $(this).closest('.route').hide(300, () => {
                $(this).closest('.route').remove();
                updateTotal();
                if ($('.routeNumber')) {
                    for (let i = 0; i < $('.routeNumber').length; i++) {
                        $($('.routeNumber')[i]).text(`Route ${i + 1}`);
                    }
                }
            });
        }
        if ($(this).closest('.hotelUnit')) {
            $(this).closest('.hotelUnit').hide(300, () => {
                $(this).closest('.hotelUnit').remove();
                updateTotal();
                if ($('.hotelNumber')) {
                    for (let i = 0; i < $('.hotelNumber').length; i++) {
                        $($('.hotelNumber')[i]).text(`Hotel ${i + 1}`);
                    }
                }
            });
        }
        if ($(this).closest('.passenger')) {
            $(this).closest('.passenger').hide(300, () => {
                $(this).closest('.passenger').remove();
                updateTotal();
                if ($('.passNumber')) {
                    for (let i = 0; i < $('.passNumber').length; i++) {
                        $($('.passNumber')[i]).text(`Passenger ${i + 1}`);
                    }
                }
            });
        }
    }
    function nextPage() {
        let allPage = $('.scroll_y .step');
        let allPageLength = $('.scroll_y .step').length;
        let currentPage = $('.scroll_y .step.activePage').index();
        let validation;
        let requiredInput = $('.scroll_y .step.activePage').find('[data-valid]');

        for (let i = 0; i < requiredInput.length; i++) {
            if ($(requiredInput[i]).prop("tagName") == 'INPUT' && !$(requiredInput[i]).prop('class').includes('selectBoxDisplay')) {
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
        if (currentPage + 1 < allPageLength && validation != false) {
            allPage.eq(currentPage).animate({
                transition: 'all .3s',
                opacity: 0,
                left: '-150%'
            }, 300).removeClass('activePage');
            allPage.eq(currentPage + 1).animate({
                transition: 'all .3s',
                opacity: 1,
                left: '0%'
            }, 300).addClass('activePage');
            $('.progress_done').css('width', `calc((100% / 6) * ${currentPage + 1})`);
            updateTotal();
            $('.firstOrigin').text($('#origin1').val());
            $('.secondOrigin').text($('#destination1').val());
            $('.firsthotel').text($('#hotelCity1').val())
            $('#checkIn1').closest('.datepicker').find('.selected-date').text()!="Select A Date"?$('.firsthotelDate').text($('#checkIn1').closest('.datepicker').find('.selected-date').text().substr(0,6)+', '+$('#checkIn1').text().substr(-4)):'';

        }
        else if (validation != false) {
            $('.proceedingAnim').fadeIn(0);
            $('.proceedingAnim .circle').addClass('animRotate');
            proceed();
        }
        if (currentPage => 0) {
            $('.stepPrev').removeClass('not_active');
            $('.stepPrev:not(.not_active)').off({ 'click': prevPage })
            $('.stepPrev:not(.not_active)').on({ 'click': prevPage })
        }
    }

    function validateRule(type, selector,) {
        const exp = {
            name: /^([a-zA-Z ]){3,}$/,
            nameError: "Type a Valid Name (@,#..etc Cant't Be Used.)",
            code: /^(\+?[a-zA-Z0-9])+$/,
            codeError: 'Pick A Country Code',
            number: /^([0-9])+/,
            numberError: 'Numbers Only',
            numbAlpha: /^([a-zA-Z0-9])+/,
            numbAlphaError: 'Alphabet And Numbers Only',
            contactNumber: /^([0-9]){9,11}$/,
            contactNumberError: 'Type a Valid Number',
            email: /^([_\-\.0-9a-zA-Z])+@([_\-\.0-9a-zA-Z])+\.([a-zA-Z]){2,7}$/,
            emailError: '"xyz@email.com"',
            date: /^([0-9]){2}\-([a-zA-Z])+\-([0-9]){4}$/,
            dateError: 'Select A Valid Date',
            select: /^([a-zA-Z0-9\- ])+/,
            selectError: 'Select an Option'
        }
        type = type;
        text = selector.prop("tagName") == "INPUT" ? selector.val() : selector.text();
        if (type != 'bypass') {
            let x = exp[type].test(text);

            if (x == true) {
                return { res: true, error: exp[`${type}Error`] }
            }
            else {
                return { res: false, error: exp[`${type}Error`] }
            }
        }

    }

    function prevPage() {
        let allPage = $('.scroll_y').children();
        let currentPage = $('.scroll_y .activePage').index();
        if (currentPage + 1 > 1) {
            allPage.eq(currentPage).animate({
                transition: 'all .3s',
                opacity: 0,
                left: '100%'
            }, 300).removeClass('activePage');
            allPage.eq(currentPage - 1).animate({
                transition: 'all .3s',
                opacity: 1,
                left: '0%'
            }, 300).addClass('activePage');
            $('.progress_done').css('width', `calc((100% / 6) * ${currentPage - 1})`);

        }
        if (currentPage == 1) {
            $('.stepPrev').addClass('not_active')
        }
    }
    // block tab functonality
    $('.block-tab').on('keydown', blockTab);
    function blockTab(e) { 
        if (e.keyCode == 9) e.preventDefault(); 
      }
    // Selector Box
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
    // receiving ways
    $('label[for=ReceiveNow]').click(function(){
        $(this).closest('.receiveDetails').find('#receivingDate').closest('.datepicker').find('.selected-date').removeAttr('data-required , data-valid');
        $(this).closest('.receiveDetails').find('#receivingDate').closest('.input').hide(300);
        $(this).closest('.receiveDetails').find('.dateAlert').show(300)
    });
    $('label[for=ReceiveLater]').click(function(){
        $(this).closest('.receiveDetails').find('#receivingDate').closest('.datepicker').find('.selected-date').attr({'data-required':'true','data-valid':'fasle'})
        $(this).closest('.receiveDetails').find('.dateAlert').show(300);
        $(this).closest('.receiveDetails').find('#receivingDate').closest('.input').show(300);
    });
    $('.receivingSource span').click(function () {
        $('.receivingSource span').removeClass('receivingSourceActive');
        $(this).addClass('receivingSourceActive');
    });
    // purpose proof Of return
    $('#purpose').on({
        'change': function () {
            if ($(this).val() == 'Proof of Return') {
                $('#airlineDeatils').show(300).css('display', 'flex');
                $('#flightNumber').attr({ 'required': 'true', 'data-valid': 'false' })
                $('#flightDate').attr({ 'data-required': 'true', 'data-valid': 'false' })
            }
            else {
                $('#airlineDeatils').hide(300, () => {
                    $('#airlineDeatils').css('display', 'none')
                    $('#flightNumber').removeAttr('required , data-valid');
                    $('#flightDate').removeAttr('data-required , data-valid');
                })
            }
        }
    })
    // terms check
    $('.T-C input[type=checkbox]').change(function () {
        if ($('.T-C input[type=checkbox]:checked').length != 0) {
            $('.T-C input[type=checkbox]:checked').closest('.T-C').attr('data-valid', 'true');
        }
        else {
            $('.T-C input[type=checkbox]').closest('.T-C').attr('data-valid', 'false');
        }
    })


    updateTotal();
    var charges = [
        [
            [5, 400],
            [5, 400],
            [10, 800],
            [10, 800],
            [15, 1200],
            [15, 1200]
        ],
        [
            [3, 250],
            [3, 250],
            [6, 500],
            [6, 500],
            [9, 1000],
            [9, 1000]
        ]
    ]
    function updateTotal() {
        var allPass = $('.allPassenger .passenger').length,
            routeLength = 0, hotelLength = 0, flightUSD = 0,
            flightINR = 0, hotelUSD = 0, hotelINR = 0,
            passCount = $('#passengerCount'),
            routeCount = $('#routeCount'),
            hotelCount = $('#hotelCount'),
            gstCount = $('#gstCount'),
            gst = 18;

        if ($('.hotelBox').closest('[data-active=true]').length !== 0 && $('.rout_style_box').closest('[data-active=true]').length !== 0) {
            hotelLength = $('.hotelBox .hotelUnit').length
            routeLength = $('.rout_style_box .route').length;
            flightUSD = charges[0][routeLength - 1][0]
            flightINR = charges[0][routeLength - 1][1]
            hotelUSD = charges[1][hotelLength - 1][0]
            hotelINR = charges[1][hotelLength - 1][1]
            $('.receipt_item.receipt_passenger').eq(0).animate({ 'height': `${$('.receipt_item.receipt_passenger').eq(0).prop('scrollHeight') + 10 != 31 ? 31 : 31}px`, 'overflow-y': 'visible', 'padding-top': '10px' }, 'fast')
            $('.receipt_item.receipt_passenger').eq(1).animate({ 'height': `${$('.receipt_item.receipt_passenger').eq(1).prop('scrollHeight') + 10 != 31 ? 31 : 31}px`, 'overflow-y': 'visible', 'padding-top': '10px' }, 'fast')
        }
        else if ($('.hotelBox').closest('[data-active=true]').length !== 0) {
            hotelLength = $('.hotelBox .hotelUnit').length
            hotelUSD = charges[1][hotelLength - 1][0]
            hotelINR = charges[1][hotelLength - 1][1]
            $('.receipt_item.receipt_passenger').eq(0).animate({ 'height': `${$('.receipt_item.receipt_passenger').eq(0).prop('scrollHeight') + 10 != 31 ? 31 : 31}px`, 'overflow-y': 'visible', 'padding-top': '10px' }, 'fast')
            $('.receipt_item.receipt_passenger').eq(1).animate({ 'height': `0px`, 'overflow-y': 'hidden', 'padding-top': '0px' }, 'fast')
        }
        else if ($('.rout_style_box').closest('[data-active=true]').length !== 0) {
            routeLength = $('.rout_style_box .route').length;
            flightUSD = charges[0][routeLength - 1][0]
            flightINR = charges[0][routeLength - 1][1]
            $('.receipt_item.receipt_passenger').eq(1).animate({ 'height': `${$('.receipt_item.receipt_passenger').eq(1).prop('scrollHeight') + 10 != 31 ? 31 : 31}px`, 'overflow-y': 'visible', 'padding-top': '10px' }, 'fast')
            $('.receipt_item.receipt_passenger').eq(0).animate({ 'height': `0px`, 'overflow-y': 'hidden', 'padding-top': '0px' }, 'fast')
        }
        passCount.text(allPass);
        routeCount.text(routeLength);
        hotelCount.text(hotelLength);
        gstCount.text(`${gst}%`);
        $('#hotelAmountUSD').text('$ ' + hotelUSD.toFixed(2));
        $('#routeAmountUSD').text('$ ' + flightUSD.toFixed(2));
        $('#passengerAmountUSD').text('$ ' + ((flightUSD * allPass) + (hotelUSD * allPass)).toFixed(2));
        $('#gstAmountUSD').text('$ ' + ((((flightUSD * allPass) + (hotelUSD * allPass)) / 100) * gst).toFixed(2));
        $('#TotalAmountUSD').text('$ ' + ((((flightUSD * allPass) + (hotelUSD * allPass)) + ((((flightUSD * allPass) + (hotelUSD * allPass)) / 100) * gst))).toFixed(2));

        $('#hotelAmountINR').text('₹ ' + hotelINR.toFixed(2));
        $('#routeAmountINR').text('₹ ' + flightINR.toFixed(2));
        $('#passengerAmountINR').text('₹ ' + ((flightINR * allPass) + (hotelINR * allPass)).toFixed(2));
        $('#gstAmountINR').text('₹ ' + ((((flightINR * allPass) + (hotelINR * allPass)) / 100) * gst).toFixed(2));
        $('#TotalAmountINR').text('₹ ' + ((((flightINR * allPass) + (hotelINR * allPass)) + ((((flightINR * allPass) + (hotelINR * allPass)) / 100) * gst))).toFixed(2));
    }

    function proceed() {
        var textarea = $('textarea#details');
        var UniqCode = "";
        var char = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'];
        for (var i = 0; i < 5; i++) {
            var randomIndex = Math.floor(Math.random() * char[0].length);
            UniqCode += char[0][randomIndex];
        }
        let totalUSD = parseFloat($('#TotalAmountUSD').text().match(/\d+\.[0-9]+/));
        let totalINR = parseFloat($('#TotalAmountINR').text().match(/\d+\.[0-9]+/));
        let subTotelUSD = parseFloat($('#passengerAmountUSD').text().match(/\d+\.[0-9]+/));
        let subTotelINR = parseFloat($('#passengerAmountINR').text().match(/\d+\.[0-9]+/));
        var details = `
            "allPassengrs":"${$('.allPassenger .passenger').length}",
            "allSectors":"${$('.flight_box[data-active=true] .rout_style_box .route').length}",
            "allHotels":${$('.hotelBox[data-active=true] .hotelUnit').length},
            "AmountInUSD":"${totalUSD}",
            "AmountInINR":"${totalINR}",
            "SubAmountInUSD":"${subTotelUSD}",
            "SubAmountInINR":"${subTotelINR}",
            "massage":"${$('#massage').val()}",
            "receiveWith":"${$('.receivingSource .receivingSourceActive').text()}",
            "receivingDate":"${$('#receivingDate').closest('.datepicker').find('[data-valid]').length != 0 ? $('#receivingDate').attr('data-selected-date'): 'Now'}",
            "UniqCode":"${UniqCode}",
            "country":"${$(`#country`).val()}",
            "number":"${$(`#number`).val()}",
            "mail":"${$(`#mail`).val()}",
            "Purpose":"${$(`#purpose`).val()}",
            "currency":"${$('.currency').attr('data-currencyType')==1?1:0}",
        `;
        // loop For All Passangers Details
        for (var i = 0; i < $('.allPassenger .passenger').length; i++) {
            details += `
            "passenger${i + 1}title":"${$(`#title${i + 1}`).val()}",
            "passenger${i + 1}fName":"${$(`#fName${i + 1}`).val()}",
            "passenger${i + 1}lName":"${$(`#lName${i + 1}`).val()}",
            "passenger${i + 1}DOB":"${$(`#DOB${i + 1}`).attr('data-selected-date')}",
            "passenger${i + 1}nation":"${$(`#nation${i + 1}`).val()}",
            `;
        }
        // loop For All Sectors Details
        for (var i = 0; i < $('.flight_box[data-active=true] .rout_style_box .route').length; i++) {
            details += `
            "sector${i + 1}origin":"${$(`#origin${i + 1}`).val()}",
            "sector${i + 1}desti":"${$(`#destination${i + 1}`).val()}",
            "sector${i + 1}date":"${$(`#date${i + 1}`).attr('data-selected-date')}"
            `;
            if ($('#return_date').length !=0) {
                details+=`,"returnDate":"${$(`#return_date`).attr('data-selected-date')}"`;
            }
            else{
                details+=`,"returnDate":"null"`;
            }
            if (i == $('.flight_box[data-active=true] .rout_style_box .route').length - 1 && $('.hotelBox[data-active=true] .hotelUnit').length == 0) {
                break;
            }
            else {
                details += `,`;
            }
        }
        // Loop For All Hotel Details
        for (var i = 0; i < $('.hotelBox[data-active=true] .hotelUnit').length; i++) {
            details += `
            "hotel${i + 1}city":"${$(`#hotelCity${i + 1}`).val()}",
            "hotel${i + 1}checkin":"${$(`#checkIn${i + 1}`).attr('data-selected-date')}",
            "hotel${i + 1}checkout":"${$(`#checkOut${i + 1}`).attr('data-selected-date')}"
            `;
            if (i == $('.hotelBox[data-active=true] .hotelUnit').length - 1) {
                break;
            }
            else {
                details += `,`;
            }
        }
        // flight number
        if ($('#flightNumber').attr("required") == 'required') {
            details += `,
            "flightNumber":"${$(`#flightNumber`).val()}"`;
        }
        details = `{${details}}`;
        textarea.val(details);
        setTimeout(()=>{
        $('#mainForm').submit()
        }, 200);

    }

});

