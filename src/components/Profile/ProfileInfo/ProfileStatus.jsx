import React from "react";
import style from './ProfileInfo.module.css'

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {

        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {

        this.setState({
            editMode: false,

        });
        this.props.updateUserStatus(this.state.status);
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.status !== this.props.status) {
    //         this.setState({
    //             status: this.props.status
    //         });
    //     }
    // }

    render() {

        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <h4>Статус:</h4>
                        <span className={style.statusText} onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status} />
                    </div>
                }
                {/* 
                <div>
                    <button >push me!</button>
                </div> */}
            </div>
        )
    }
}


export default ProfileStatus;