// import React, {Component} from 'react'
// import axios from 'axios'

// class EditPost extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             id: this.props.match.params.id,
//             points: '',
//         }
//     }

//     handleUpvotePost = async () => {
//         const { id, points } = this.state

//         const payload = { points: points + 1}

//         await axios.put(id, payload).then(res => {
//             window.alert(`Movie updated successfully`)
//             this.setState({
//                 name: '',
//                 rating: '',
//                 time: '',
//             })
//         })
//     }

//     // componentDidMount() {
//     //     axios.get('http://localhost:5000/api/posts/updatePost' + this.props.match.params.id)
//     //         .then(res => {
//     //             this.setState({
//     //                 postPoints: res.data.data.points
//     //             })
//     //         })
//     //         .catch(function (err) {
//     //             console.log(err);
//     //         })
//     // }
    
//     render() {
//         return (
//             <div>
//             </div>
//         )
//     }
// }

// export default EditPost