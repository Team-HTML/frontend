import React from 'react';

class LandingPage extends React.Component {

    render() {
        return (
            <>
				<div className="main w-100 d-flex align-items-center">
					<div className="container h-100 px-0">
						<div className="main__description row px-0 align-items-center">
							<div className="col-md-6 h-100">
								<p className="text-md-center main__description-text mb-5"> 
								<div className="main__header">
									<b>Innovation at Ease</b>
								</div>
								Blueprint is a rapid-prototyping web application that generates functioning HTML files from paper prototypes. 
								<p>More time designing, less time coding.</p>
								</p>
								<div className="border"></div>
								<div className="justify-content-center d-flex p-3">
									<h2> Quickstart </h2>
								</div>
								<ol>
									<li>Outline a paper prototype of your webapp with the given symbols</li>
									<li>Upload a photo of the prototype to our application</li>
									<li>Edit your webapp with our custom UI or download the source code</li>
								</ol>
							</div>
							<div className="col-md-6">
								<div className="justify-content-center d-flex p-3">
									<h2> Instructional Video </h2>
								</div>
								<div className="justify-content-center d-flex p-3">
									<iframe class="shadow-lg" width="480" height="300" src="https://www.youtube.com/embed/VTGr78uWsvE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
									</iframe>
								</div>						
							</div>
						</div>
					</div>
				</div>
            </>
        )
    }
}

export default LandingPage;