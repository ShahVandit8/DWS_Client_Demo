import { React, useEffect, useState } from 'react'

function Page2({ page, setpage, modules, setModules }) {

    useEffect(() => {
        window.scroll(0, 0)
    })

    const [Title, setTitle] = useState('')
    const [Goal, setGoal] = useState('')

    const [topics, setTopics] = useState([]);
    const [input, setInput] = useState("");

    const [objectives, setObjectives] = useState([]);
    const [input1, setInput1] = useState("");


    const addTopic = () => {

        if (input.length < 1) {
            alert("input field is empty")
        }
        else {
            const NewTopic = {
                id: Math.floor(Math.random() * (999 - 1) + 1),
                Title: input,
            }

            setTopics([...topics, NewTopic]);
            console.log(topics)
            setInput("")
        }

    }

    const deleteTopic = (topic) => {
        const newList = topics.filter((item) => item !== topic);

        setTopics(newList);
    }

    const addObjectives = () => {

        if (input1.length < 1) {
            alert("input field is empty")
        }
        else {
            const NewObjective = {
                id: Math.floor(Math.random() * (999 - 1) + 1),
                Title: input1,
            }

            setObjectives([...objectives, NewObjective]);
            console.log(objectives)
            setInput1("")
        }

    }

    const deleteObjectives = (objectives) => {
        const newList = objectives.filter((item) => item !== objectives);

        setObjectives(newList);
    }


    const addModule = () => {

        if (Title.length < 1) {
            alert("Please enter module title")
        }
        else if (Goal.length < 1) {
            alert("Please enter module goal")
        }
        else if (topics.length < 1) {
            alert("Please enter atleast one topic")
        }
        else if (objectives.length < 1) {
            alert("Please enter atleast one objective")
        }
        else {
            const NewModule = {
                id: Math.floor(Math.random() * (999 - 1) + 1),
                ModuleName: Title,
                ModuleGoal: Goal,
                ModuleObjective: objectives,
                ModuleTopics: topics,
                Status: 0,
            }


            setModules([...modules, NewModule])
            setTopics([])
            setInput("")
            setObjectives([])
            setInput1("")
            setGoal('')
            setTitle('')
            console.log(modules)

            const modal1 = document.getElementById('exampleModal')
            const close = document.getElementById('closebutton')

            modal1.click(close)
        }


    }

    const deleteModule = (module) => {
        const newList = modules.filter((item) => item !== module);

        setModules(newList);
    }

    const NextPage = (e) => {
        e.preventDefault();
        if (modules.length < 1) {
            alert("Please add atleast one module")
        }
        else {
            setpage(3)
        }
    }

    return (
        <div>
            <div className="row mt-3">
                <div className="col-12">
                    <div className="card" style={{ borderRadius: '0' }}>
                        <div className="card-header">
                            <span className="text-dark">Modules and Topics</span>
                        </div>
                        <div className="card-body">
                            <div className="container">

                                <div className="accordion" id="accordionExample">

                                    {modules.length > 0 ?
                                        modules.map(item => (
                                            <div className="accordion-item mb-1">
                                                <h2 className="accordion-header" id={"heading" + item.id}>
                                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + item.id} aria-expanded="false" aria-controls={"collapse" + item.id}>
                                                        <span>Module Title : </span>
                                                        <span className="ml-2">{item.ModuleName}</span>
                                                    </button>
                                                </h2>
                                                <div id={"collapse" + item.id} className="accordion-collapse collapse" aria-labelledby={"heading" + item.id} data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <span>Module Goal</span>
                                                        <input type="text" name="ModuleGoal" value={item.ModuleGoal} className='form-control' />

                                                        <div className="mt-3">
                                                            <span>Topics</span>
                                                            {
                                                                item.ModuleTopics.map(items => (
                                                                    <li>{items.Title}</li>
                                                                ))

                                                            }
                                                        </div>

                                                        <div className="mt-3">
                                                            <span>Objectives</span>
                                                            {
                                                                item.ModuleObjective.map(items => (
                                                                    <li>{items.Title}</li>
                                                                ))

                                                            }
                                                        </div>

                                                        <span>{item.id}</span>

                                                        <div>
                                                            <button onClick={() => deleteModule(item)} className="btn bi bi-trash"></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                        :
                                        <span>Add a Module</span>
                                    }


                                </div>

                                <button style={{ borderRadius: '0' }} className="btn btn-dark mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Module +</button>

                                <hr />

                                <button onClick={() => setpage(1)} type="button" className="btn btn-dark mt-3 mr-2" style={{ borderRadius: '0' }}>
                                    <i className='bi bi-chevron-left'></i> Back
                                </button>

                                <button onClick={(e) => NextPage(e)} type="button" className="btn btn-dark mt-3" style={{ borderRadius: '0' }}>
                                    Next <i className='bi bi-chevron-right'></i>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                id="exampleModal"
                // style={{zIndex:'1001'}}
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Add Module
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="p-2">
                                <div className="row">
                                    Module Title: <input type="text" name='ModuleName' required value={Title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div className="row mt-2">
                                    Module Goal: <input type="text" name="ModuleGoal" required value={Goal} onChange={(e) => setGoal(e.target.value)} />
                                </div>

                                <div className="form-row mt-3">
                                    <table className="table table-striped border">
                                        <thead>
                                            <tr>
                                                <th scope="col" className='bg-light'>Topics</th>
                                                <th scope="col" className='bg-light text-white'></th>
                                            </tr>
                                            <tr>
                                                <th scope="col">
                                                    <input
                                                        style={{ padding: '5px' }}
                                                        type="text"
                                                        name="Topic"
                                                        value={input}
                                                        placeholder="Add a Topic"
                                                        onChange={(e) => setInput(e.target.value)}
                                                    />
                                                </th>
                                                <th scope="col">
                                                    <button className="btn btn-success" type="button" onClick={() => addTopic(input)}>Add</button>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                topics.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>{item.Title}</td>
                                                        <td>
                                                            <button className='btn' type="button" onClick={() => deleteTopic(item)}>&times;</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>

                                <div className="form-row mt-3">
                                    <table className="table table-striped border">
                                        <thead>
                                            <tr>
                                                <th scope="col" className='bg-light'>Objectives</th>
                                                <th scope="col" className='bg-light text-white'></th>
                                            </tr>
                                            <tr>
                                                <th scope="col">
                                                    <input
                                                        style={{ padding: '5px' }}
                                                        type="text"
                                                        name="Topic"
                                                        value={input1}
                                                        placeholder="Add a Objective"
                                                        onChange={(e) => setInput1(e.target.value)}
                                                    />
                                                </th>
                                                <th scope="col">
                                                    <button className="btn btn-success" type="button" onClick={() => addObjectives(input1)}>Add</button>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                objectives.map((item) => (
                                                    <tr key={item.id}>
                                                        <td>{item.Title}</td>
                                                        <td>
                                                            <button className='btn' type="button" onClick={() => deleteObjectives(item)}>&times;</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                id="closebutton"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-dark" onClick={addModule} >
                                Add Module
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Page2
