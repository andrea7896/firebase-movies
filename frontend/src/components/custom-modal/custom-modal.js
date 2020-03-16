import React, { Component } from 'react'
import { Modal, Image, Form, TextArea, Rating, Button, Input } from 'semantic-ui-react'
import _ from 'lodash'

import { updateMovie, deleteMovie, createMovie } from '../../services/movie-service'

import './custom-modal.css'

export default class CustomModal extends Component{

    constructor(props) {
        super(props);

        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.onChangeData = this.onChangeData.bind(this);
        this.resetMovie = this.resetMovie.bind(this);
        this.updateMovieFn = this.updateMovieFn.bind(this);
        this.deleteMovieFn = this.deleteMovieFn.bind(this);
        this.createMovieFn = this.createMovieFn.bind(this);

        this.state = {};
        this.resetMovie();
    }
    open = false;
    movie = {};

    closeModal() {
        this.open = false;
    }

    openModal() {
        this.open = true;
    }

    onChangeData = (event, data) => {
        this.movie[data.name] = data.value;
        this.forceUpdate();
    };

    onCloseModal(event) {
        this.closeModal();
        this.props.props.onCloseModal();
        this.resetMovie();
    }

    resetMovie() {
        this.movie = {
            "id": null,
            "video": null,
            "vote_count": null,
            "vote_average": null,
            "title": '',
            "release_date": null,
            "original_language": null,
            "original_title": '',
            "genre_ids": null,
            "backdrop_path": null,
            "adult": null,
            "overview": '',
            "poster_path": '',
            "popularity": null,
            "media_type": null
        }
    }

    async updateMovieFn() {
        await updateMovie(this.movie);
        window.location.reload();
    }

    async createMovieFn() {
        await createMovie(this.movie);
        window.location.reload();
    }

    async deleteMovieFn() {
        await deleteMovie(this.movie);
        window.location.reload();
    }

    render() {
        let props = this.props.props;

        if (this.movie && (this.movie.id || this.movie.title)) {
            console.log(1, this.movie);
        } else {
            this.movie = _.cloneDeep(props.movie);
        }

        if (!Boolean(this.movie)) {
            this.resetMovie();
        }
        
        props.open ? this.openModal() : this.closeModal();
        let header = this.movie.title ? 'Movie Details' : 'New movie';
        this.movie.poster_path = this.movie.poster_path || '';
        this.movie.title = this.movie.title || '';
        this.movie.poster_path = this.movie.poster_path || '';
        this.movie.overview = this.movie.overview || '';
        this.movie.vote_average = this.movie.vote_average || 0;

        let buttons;
        if (this.movie.id) {
            buttons = [
                <Button key="1" onClick={this.deleteMovieFn} color='red'>Delete</Button>,
                <Button key="2" onClick={this.updateMovieFn} color='blue'>Update</Button>,
                <Button key="3" onClick={this.onCloseModal} color='orange'>Cancel</Button>
            ]
        } else {
            buttons = [
                <Button key="1" onClick={this.createMovieFn} color='blue'>Create</Button>,
                <Button key="2" onClick={this.onCloseModal} color='orange'>Cancel</Button>
            ]
        }

        return <Modal open={this.open}>
            <Modal.Header>{header}</Modal.Header>
            <Modal.Content image>
                <Image wrapped size='medium' src={this.movie.poster_path} />
                <Modal.Description>
                <Form>
                    <Form.Field>
                        <label>Title</label>
                        <Input placeholder='Title' value={this.movie.title} onChange={this.onChangeData} name="title"/>
                    </Form.Field>
                    <Form.Field>
                        <label>Overview</label>
                        <TextArea placeholder='Overview' value={this.movie.overview} onChange={this.onChangeData} name="overview"/>
                    </Form.Field>
                    <Form.Field>
                        <label>URL Image</label>
                        <Input placeholder='URL' value={this.movie.poster_path} onChange={this.onChangeData} name="poster_path"/>
                    </Form.Field>
                    <Form.Field>
                        <label>Rating</label>
                        <Rating icon='star' defaultRating={this.movie.vote_average / 2} maxRating={5} />
                    </Form.Field>
                </Form>
                <br></br>
                {buttons}
                </Modal.Description>
            </Modal.Content>
        </Modal>;
    }
}
