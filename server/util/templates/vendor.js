var inlineCSS = require('juice');

module.exports = function () {

	var obj = {   //demo object
		orderId: 12345,
		fullAddress: '888 Test Drive, Orem UT 84058',
		order: [
			{
				product: 'Self-Lacing Shoes',
				sku: 9000,
				quantity: 1
			},
			{
				product: 'Hoverboard',
				sku: 8989,
				quantity: 2
			},
			{
				product: 'Lightsaber',
				sku: 55757,
				quantity: 1000000
			},
		]
	};

	var order = obj.order;

	var html = `
	<html>
	<head>
		<title>Order Invoice</title>
	<style type='text/css'>
	table {
		margin:10px;
	}
	table, th, tr, td {
		border: 1px solid black;
		border-collapse: collapse;
		padding: 5px;
	}
	</style>
	</head>
	<body>
		<table>
			<tr>
				<td>OrderId</td>
				<td>${obj.orderId}</td>
			</tr>
			<tr>
				<td>Address</td>
				<td>${obj.fullAddress}</td>
			</tr>
		</table>
		<table>
			<tr>
				<th>Product</th>
				<th>SKU</th>
				<th>Quantity</th>
			</tr>
	`;

	for (var i = 0; i < order.length; i++) {
		html = html + `
				<tr>
					<td>${order[i].product}</td>
					<td>${order[i].sku}</td>
					<td>${order[i].quantity}</td>
				</tr>
		`;
	}

	html = html + `	
		</table>
	</body>
	</html>
	`;

	html = inlineCSS(html);
	return html;
}