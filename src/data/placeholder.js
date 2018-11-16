const html = `
<!DOCTYPE html>
<html>
<head>
	<meta name = "viewport" content = "width = device-width, initial-scale = 1, maximum-scale = 1.0, user-scalable = 0"/>
	<link rel="stylesheet" type="text/css" href="style.css"/>
<style>
body{
	position: relative;
	background-color: #293030;
	width: 100vw;
	height: 100vw;
}
#wrap3{
	position: relative;
	top: 10%;
	left: 10%;
	width: 80%;
	height: 80%;
}
#wrap2{
	position: relative;
	top: 62.5%;
	width: 100.0%;
	height: 37.5%;
}
#div2{
	position: relative;
	border: 2px solid white;
	width: 37.5%;
	height: 100.0%;
}
#wrap1{
	position: relative;
	left: 62.5%;
	top: -100.0%;
	width: 37.5%;
	height: 100.0%;
}
#div3{
	position: relative;
	border: 2px solid white;
	top: 66.66666666666667%;
	width: 100.0%;
	height: 33.333333333333336%;
}
#p1{
	position: relative;
	border: 2px solid white;
	margin: 0%;
	overflow: scroll;
	top: -33.333333333333336%;
	width: 100.0%;
	height: 33.333333333333336%;
}
#div1{
	position: relative;
	border: 2px solid white;
	top: -37.5%;
	width: 100.0%;
	height: 37.5%;
}
</style>
</head>
<body>
	<div id = "wrap3" class = "wrap">
		<div id = "wrap2" class = "wrap">
			<div id = "div2" class = "div">
			</div>
			<div id = "wrap1" class = "wrap">
				<div id = "div3" class = "div">
				</div>
				<p id = "p1" class = "p">
					Lorem ipsum dolor sit amet, pri nostrud scaevola at, ex agam habeo assueverit mei.
				</p>
			</div>
		</div>
		<div id = "div1" class = "div">
		</div>
	</div>
</body>
</html>
`
export default html;