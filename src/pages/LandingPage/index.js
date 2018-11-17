import React from 'react';

class LandingPage extends React.Component {

    render() {
        return (
            <>
				<div className="main w-100 d-flex align-items-center">
					<div className="container h-100 px-0">
						<div className="main__description row px-0 align-items-center">
							<div className="col-md-6 h-100">
								<img className="w-50" src="/white.png"></img>
								<p className="text-md-left main__description-text"> 
									In publishing and graphic design, lorem ipsum is a placeholder text used to demonstrate the visual form of a document without relying on meaningful content. Replacing the actual content with placeholder text allows designers to design the form of the content before the content itself has been produced. 	
								</p>
							</div>
							<div className="col-md-6">

								<div className="justify-content-center d-flex p-3">
									<h2> Instructional Video </h2>
								</div>
								<div className="justify-content-center d-flex p-3">
									<iframe class="shadow-lg" width="480" height="300" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
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