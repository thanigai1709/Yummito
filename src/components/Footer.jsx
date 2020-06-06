import React, { Component } from 'react';
class Footer extends Component {
    state = {  }
    render() { 
        return (
            <div className="yumitto-footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8 text-center">
                            <div className="footer-social-icons-wrp g-pt40">
                                <span><i className="fab fa-facebook-f"></i></span>
                                <span><i className="fab fa-instagram"></i></span>
                                <span><i className="fab fa-twitter"></i></span>
                                <span><i className="fab fa-youtube"></i></span>
                            </div>
                            <div className="footer-logo g-pt36">
                            <span className="site-name">Yumitto</span>
                            </div>
                            <div className="footer-address g-pt36">
                                <span>Excrin Think Labs</span><span className="footer-sprt">|</span><span>5 Street, Golden Flats Colony, Moggapair, Chennai</span><span className="footer-sprt">|</span><span>Phone: 044 4287 2445</span>
                            </div>
                            <div className="footer-cpy-rghts g-pt16 g-pb16">
                            ©2020 Excrin Think Labs LLP All Rights Reserved
                            </div>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Footer;