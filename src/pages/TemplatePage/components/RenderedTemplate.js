import React from 'react';
import $ from 'jquery';

class RenderedTemplate extends React.Component {

    componentDidMount() {
        $('#rendered').contents().find('html').html(this.props.html)
        $('#rendered').contents().find('html').append(
            `<style>${this.props.css} <style/>`
        )

        const inlineStyle = this.props.css.split('body {')[1].split('}')[0]
        $('#rendered').attr('style', inlineStyle)
    }
    
    componentDidUpdate() {
        $('#rendered').contents().find('html').html(this.props.html)
        $('#rendered').contents().find('html').append(
            `<style>${this.props.css} <style/>`
        )
        const inlineStyle = this.props.css.split('body {')[1].split('}')[0]
        $('#rendered').attr('style', inlineStyle)
    }

    render() {
        return (
            <div className="w-100 container-fluid px-0 h-100">
                <iframe className="" id="rendered">
                </iframe>
            </div>

        )
    }
}

export default RenderedTemplate;
