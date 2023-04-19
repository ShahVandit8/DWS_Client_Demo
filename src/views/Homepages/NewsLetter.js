import React from 'react'

function NewsLetter() {
    return (
        <footer id="footer" className="footer">
            <div className="footer-newsletter">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12 text-center">
                            <h4>Our Newsletter</h4>
                            <p>
                                Subscribe to our newsletter
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <form action="" method="post">
                                <input type="email" name="email" placeholder="Your email here" />
                                <input type="submit" value="Subscribe" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default NewsLetter
