var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/\r\n/g, "\n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }


	var Invoice_data;
	var row_count = 0;
	var current_currency_unit = "$";
	const Current_d = new Date();
	document.getElementById("invoice_currency").onchange = function (e) { current_currency_unit = document.getElementById("invoice_currency").options[document.getElementById("invoice_currency").selectedIndex].text.split(" ")[0]; }


	var is_edit_view = true;
	function invoice_update() {

		var rows_body = document.getElementById("item-rows-body");
		rows_body.innerHTML = ""; for (var n = 0; n < document.querySelector(".invoice-items tbody").children.length; n++) {


			var current_row = document.querySelector(".invoice-items tbody").children[n];

			var cls_name = current_row.className.split(" ");
			if (cls_name.length == 2) {

				rows_body.innerHTML += '<tr>' +
					'<td class="description">' + document.querySelector("." + cls_name[1] + ">td>.description").value + '</td>' +
					'<td class="quantity">' + document.querySelector("." + cls_name[1] + ">td>.quantity").value + '</td>' +
					'<td class="unit-price">' + current_currency_unit + document.querySelector("." + cls_name[1] + ">td>.unit-price").value + '</td>' +
					'<td class="vat">' + document.querySelector("." + cls_name[1] + ">td>.vat").value + '%</td>' +
					'<td class="amount row-total">' + current_currency_unit + document.querySelector("." + cls_name[1] + ">td>.total").innerHTML + '</td>' +
					'</tr>';
			} else {
				rows_body.innerHTML += '<tr>' +
					'<td class="description">' + document.querySelector("." + cls_name[0] + ">td>.description").value + '</td>' +
					'<td class="quantity">' + document.querySelector("." + cls_name[0] + ">td>.quantity").value + '</td>' +
					'<td class="unit-price">' + current_currency_unit + document.querySelector("." + cls_name[0] + ">td>.unit-price").value + '</td>' +
					'<td class="vat">' + document.querySelector("." + cls_name[0] + ">td>.vat").value + '%</td>' +
					'<td class="amount row-total">' + current_currency_unit + document.querySelector("." + cls_name[0] + ">td>.total").innerHTML + '</td>' +
					'</tr>';

			}
		}


		document.getElementsByClassName("invoice-number")[0].innerText = "#" + document.getElementsByName("invoice[invoice_number]")[0].value;
		document.getElementsByClassName("invoice-due-at")[0].innerText = document.getElementsByName("invoice[invoice_due_at]")[0].value;
		document.getElementsByClassName("invoice-sender")[0].innerText = document.getElementsByName("invoice[sender_address]")[0].value;
		document.getElementsByClassName("invoice-recipient")[0].innerText = document.getElementsByName("invoice[recipient_address]")[0].value;
		document.querySelector(".invoice-notes-content>p").innerText = document.getElementsByName("invoice[description]")[0].value;
		document.querySelector(".bank-account").innerText = document.getElementsByName("invoice[bank_account]")[0].value;
		document.querySelector(".bank-swift").innerText = document.getElementsByName("invoice[bic]")[0].value;
		document.querySelector(".bank-referabce").innerText = document.getElementsByName("invoice[reference]")[0].value;
		document.querySelector(".bank-business-id").innerText = document.getElementsByName("invoice[business_id]")[0].value;


		document.querySelector(".total-section").innerHTML = document.querySelector(".subtotal-section-calculation").outerHTML;
		if (document.querySelector('[data-invoice-calculations-target="invoiceTotal"]').innerHTML.substr(1) == "0.00") {            document.querySelector("#btn-download").removeEventListener('click', Go_download);
			document.querySelector("#btn-download").addEventListener("click", alert_msg);
		} else { document.querySelector("#btn-download").removeEventListener('click', alert_msg);
			document.querySelector("#btn-download").addEventListener("click", Go_download);
		}




	}
function alert_msg() {
alert("Please fill at least one item to download invoice.");	
}
function Go_download() {
download_invoice();	
}
	for (var n = 0; n < document.querySelectorAll("input").length; n++) { document.querySelectorAll("input")[n].onkeyup = function () { invoice_update(); } } for (var n = 0; n < document.querySelectorAll("textarea").length; n++) { document.querySelectorAll("textarea")[n].onkeyup = function () { invoice_update(); } }

	function change_view() {
		invoice_update();


		var due_date = document.getElementsByName("invoice[invoice_due_at]")[0].value.split("-");
		const d = new Date();

		document.querySelector(".invoice-due-at").innerHTML = Get_formated_date(due_date[2], due_date[1], due_date[0]);

		document.querySelector(".invoice-created-at").innerHTML = Get_formated_date(d.getDate(), d.getMonth(), d.getFullYear());



		if (document.querySelector("#logo-image-source").getAttribute("src") != '') {

			document.querySelector('[data-controller="preview-logo"]').src = document.getElementById("logo-image-source").src;
			document.querySelector('[data-controller="preview-logo"]').className = "";
		} else {
			document.querySelector('[data-controller="preview-logo"]').className = "is-hidden";
		}


		is_edit_view = !is_edit_view;

		var innerForm = document.querySelector('[data-invoice-controls-target="innerForm"]');
		var previewFrame = document.querySelector('#preview-container');

		if (is_edit_view) {
			document.querySelector("#change_view_btn").innerText = 'Preview invoice';
			unfade(innerForm);
			fade(previewFrame);


		} else {
			document.querySelector("#change_view_btn").innerText = 'Edit invoice';
			fade(innerForm);
			unfade(previewFrame);

		}


	}



	function Get_formated_date(date, _month, year) {

		var month = ["January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"][_month - 1];
		var Current_Date = month + ' ' + date + ', ' + year;
		return Current_Date;

	}

	function unfade(element) {
		var op = 0.1;  // initial opacity
		element.style.display = 'block';
		var timer = setInterval(function () {
			if (op >= 1) {
				clearInterval(timer);
			}
			element.style.opacity = op;
			element.style.filter = 'alpha(opacity=' + op * 100 + ")";
			op += op * 0.3;
		}, 10);
	}
	function fade(element) {
		var op = 1;  // initial opacity
		var timer = setInterval(function () {
			if (op <= 0.1) {
				clearInterval(timer);
				element.style.display = 'none';
			}
			element.style.opacity = op;
			element.style.filter = 'alpha(opacity=' + op * 100 + ")";
			op -= op * 0.3;
		}, 50);
	}
	fade(document.querySelector('#preview-container'));
	var download_link = "";

	function download_invoice() {

		var due_date = document.getElementsByName("invoice[invoice_due_at]")[0].value.split("-");
		const d = new Date();

		document.querySelector(".invoice-due-at").innerHTML = Get_formated_date(due_date[2], due_date[1], due_date[0]);

		document.querySelector(".invoice-created-at").innerHTML = Get_formated_date(d.getDate(), d.getMonth(), d.getFullYear());



		if (document.querySelector("#logo-image-source").getAttribute("src") != '') {

			document.querySelector('[data-controller="preview-logo"]').src = document.getElementById("logo-image-source").src;
			document.querySelector('[data-controller="preview-logo"]').className = "";
		} else {
			document.querySelector('[data-controller="preview-logo"]').className = "is-hidden";
		}

		document.querySelector("#wait_spinner").classList.add("is-active");


		var url = "https://api.cloudconvert.com/v2/jobs";

		var xhr = new XMLHttpRequest();
		xhr.open("POST", url); var download_task_id;
		var n = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZGE5ZmQwMDk5YmFiNDZjOWQ3NTZjNzhjYjljMTkxMzRmNjM0MTM1YzI0YTE0MTk3NWJiMjc3YmU4ZjBlYTIxM2M3ZTA4MmQ2YzZiYmUyZDciLCJpYXQiOjE2NTQ3MjU4MjcuNTkwNDY4LCJuYmYiOjE2NTQ3MjU4MjcuNTkwNDcsImV4cCI6NDgxMDM5OTQyNy41Nzg1MzUsInN1YiI6IjU4MzYxODUxIiwic2NvcGVzIjpbInVzZXIucmVhZCIsInVzZXIud3JpdGUiLCJ0YXNrLnJlYWQiLCJ0YXNrLndyaXRlIiwid2ViaG9vay5yZWFkIiwid2ViaG9vay53cml0ZSIsInByZXNldC5yZWFkIiwicHJlc2V0LndyaXRlIl19.V8fDUxJg95bZMfaFQxczzt94Sf5imQlcU-ho5SY58YK_RsnzkIOZDWBE1hgLpLUHwdh_7h3WJW7JgwVMUDwaCr860jCHsz4Lzvg5aplOJs5o8cmxkwN6D7gK-TQ0Jcftn45VpGVBGMML5CxobJfXPM4GUxeY871bsXxjBvZYR3IK257kKRtHnuStVdZ8oFZv4_GtyltzE5soQaATQWbHH4op_ePPFUL_ORsfqhAf2X85Xc95zDzZLGA75fNzWN0xZYr6zoA0Shpd7wWYnZcqXIqhR69P7-sVKridslcWvry7C-vckInxhMgSHeZfQYAv66cJidhTLMZEd4xdHSwPOY6DzmRG6NRagA-dbge5fZgX6vy1KdmBo5CG8Xb4iBQOYr6zksnbyLZv6CclGoA5KRExfweBZ-fml_xnxIr53CJJhkAkttCWuCfvsjpGcQI5DXL7qfphJEnVjhliqCYSB56vZ4hxXEAA2CaOWyZ3qyjzWs4BOAHF_iVELYnQ2mFMICkHpp1Vpjl-wIrQsz5HSGUwImBmcUYdddTBvismMFYKpBuqbdYDTNJN2hAZb4KLIEUkeMlUTWK0vLaCqFad17oGUfiy-RN6ONEFMn6Y64bPzeTx8RJPp2xU7j0NTSO9uqYUzao_o8n2f16b_refRLGCcHZDOdvoOFZ2k7hlfzE";

		xhr.setRequestHeader("Authorization", n);
		xhr.setRequestHeader("Content-type", "application/json");

		xhr.onreadystatechange = function () {
			if (xhr.readyState == XMLHttpRequest.DONE) {

				const obj = JSON.parse(xhr.responseText);
				download_task_id = obj['data']['tasks']['2']['id'];

				var url2 = "https://sync.api.cloudconvert.com/v2/tasks/" + download_task_id + "?redirect=true";

				var xhr2 = new XMLHttpRequest();
				xhr2.open("GET", url2);

				xhr2.setRequestHeader("Authorization", n);
				xhr2.setRequestHeader("Content-type", "application/json");

				xhr2.onreadystatechange = function () {
					if (xhr2.readyState == XMLHttpRequest.DONE) {

						window.res_data = JSON.parse(xhr2.responseText);
						download_link = window.res_data['data']['result']['files']['0']['url'];
						window.open(download_link, '_blank')
						document.querySelector("#wait_spinner").classList.remove("is-active");
					}
				};

				xhr2.send();


			}


		};
		Invoice_data = Base64.encode('<style>/*! CSS Used from: Embedded */.invoice-details-items .unit-price{width:7rem!important;}.invoice-details-items .vat{width:3rem!important;}.invoice-details-items .amount{text-align:end!important;}/*! CSS Used from: http://127.0.0.1:5500/invoice_data/application-e545a83f2c29a379248bc8c787493efa1e0dcbe14a56d09bf5a8abb998e5f9f5.css ; media=all */@media all{.table:not(:last-child){margin-bottom:1.5rem;}p,hr,h2{margin:0;padding:0;}h2{font-size:100%;font-weight:normal;}*,*::before,*::after{box-sizing:inherit;}img{height:auto;max-width:100%;}table{border-collapse:collapse;border-spacing:0;}td,th{padding:0;}td:not([align]),th:not([align]){text-align:inherit;}hr{background-color:whitesmoke;border:none;display:block;height:2px;margin:1.5rem 0;}img{height:auto;max-width:100%;}span{font-style:inherit;font-weight:inherit;}strong{color:#363636;font-weight:700;}table td,table th{vertical-align:top;}table td:not([align]),table th:not([align]){text-align:inherit;}table th{color:#363636;}.table{background-color:white;color:#363636;}.table td,.table th{border:1px solid #dbdbdb;border-width:0 0 1px;padding:0.5em 0.75em;vertical-align:top;}.table th{color:#363636;}.table th:not([align]){text-align:inherit;}.table thead{background-color:transparent;}.table thead th{border-width:0 0 2px;color:#363636;}.table tbody{background-color:transparent;}.table tbody tr:last-child td{border-bottom-width:0;}.table.is-fullwidth{width:100%;}.title{word-break:break-word;}.title span{font-weight:inherit;}.title{color:#363636;font-size:2rem;font-weight:600;line-height:1.125;}.column{display:block;flex-basis:0;flex-grow:1;flex-shrink:1;padding:0.75rem;}.columns{margin-left:-0.75rem;margin-right:-0.75rem;margin-top:-0.75rem;}.columns:last-child{margin-bottom:-0.75rem;}.columns:not(:last-child){margin-bottom:calc(1.5rem - 0.75rem);}@media screen and (min-width: 769px), print{.columns:not(.is-desktop){display:flex;}}.has-text-grey{color:#7a7a7a!important;}.has-background-white-bis{background-color:#fafafa!important;}.is-flex-direction-row{flex-direction:row!important;}.px-4{padding-left:1rem!important;padding-right:1rem!important;}.py-4{padding-top:1rem!important;padding-bottom:1rem!important;}.is-size-6{font-size:1rem!important;}.servgrow-total-table tbody tr td{border:0;}.servgrow-total-table tbody tr td:first-child{width:60%;}.servgrow-total-table tbody tr td{text-align:right;}.servgrow-total-table tbody tr td:last-child{text-align:right;}.servgrow-total-table .servgrow-total-due{border-bottom:1px solid #d2d2d2;border-top:1px solid #d2d2d2;}@media screen and (max-width: 768px){.servgrow-total-table tbody tr td:first-child{width:20%;}.columns{margin-left:unset;margin-right:unset;}.column{padding-left:unset;padding-right:unset;}}.invoice-details-items .quantity{width:1rem;}.invoice-details-items .description{width:50%;}.invoice-details-items .unit-price{min-width:5.5rem;}.invoice-details-items .amount{width:4rem;vertical-align:middle;}@media screen and (max-width: 768px){.invoice-details-items thead tr th{font-size:12px;}.invoice-details-items tbody td,.invoice-details-items thead th{margin:0;padding:0;padding-top:5px;padding-left:5px;}.invoice-details-items tbody td{vertical-align:middle;padding-bottom:6px;}.invoice-details-items tbody td:first-child{padding-left:0;}.invoice-details-items .description{min-width:3.5rem;}.invoice-details-items .quantity{min-width:2.5rem;}.invoice-details-items .unit-price{min-width:3.5rem;}.invoice-details-items .vat{min-width:2.5rem;}.invoice-details-items .amount{text-align:center;}}.brand-override *{font-feature-settings:"zero", "ss03" 1;}.brand-override .invoice-details-items thead tr th{border:0;font-size:14px;background-color:#DCDFDF;}.brand-override .invoice-details-items thead tr th:first-child{border-top-left-radius:20px;border-bottom-left-radius:20px;padding-left:0.75rem!important;}.brand-override .invoice-details-items thead tr th:last-child{border-top-right-radius:20px;border-bottom-right-radius:20px;padding-right:0.75rem!important;}}</style>' + document.querySelector('[data-invoice-controls-target="previewFrame"]').outerHTML);
		var data = '{    "tasks": {        "invoice-data": {            "operation": "import/base64",            "file": "' + Invoice_data + '",            "filename": "data.html"        },        "convert": {            "operation": "convert",            "input_format": "html",            "output_format": "pdf",            "engine": "chrome",            "input": [                "invoice-data"            ],            "zoom": 0.8,            "margin_top": 10,            "margin_bottom": 10,            "margin_left": 10,            "margin_right": 10,            "print_background": true,            "display_header_footer": false,            "wait_until": "load",            "wait_time": 0,            "engine_version": "100"    ,"filename": "Invoice-' + Get_formated_date(Current_d.getDate(), Current_d.getMonth(), Current_d.getFullYear()) + '.pdf"    },        "download": {            "operation": "export/url",            "input": [                "convert"            ],            "inline": false,            "archive_multiple_files": false        }    },    "tag": "jobbuilder"}';

		xhr.send(data);

	}
