import React from 'react'

function CourseModuleAccordian(props) {

    const { id, ModuleName, ModuleGoal, ModuleObjective, ModuleTopics, List } = props

    console.log(List);
    
    return (
        <>
            <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingOne">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={"#flush-collapse"+id}
                        aria-expanded="false"
                        aria-controls={"flush-collapse"+id}
                    >
                        {ModuleName}
                    </button>
                </h2>
                <div
                    id={"flush-collapse"+id}
                    className="accordion-collapse collapse"
                    aria-labelledby={"flush-heading"+id}
                    data-bs-parent="#accordionFlushExample"
                >
                    <div className="accordion-body">
                        <p><strong>Goal:</strong>
                        {ModuleGoal}
                         {/* In this module, you will learn the concepts of scripting on client-side and fundamentals of JavaScript */}
                         </p>

                        <div>
                            <h5 style={{ fontSize: '18px' }}><strong>Objectives</strong></h5>
                            <p>After completing this module, you should be able to:</p>
                            <ul>
                                {
                                    ModuleObjective.map(item => (
                                        <li>{item.Title}</li>
                                    ))
                                }

                            </ul>
                        </div>

                        <div>
                            <h5 style={{ fontSize: '18px' }}><strong>Topics</strong></h5>
                            <ul>
                            {
                                    ModuleTopics.map(item => (
                                        <li>{item.Title}</li>
                                    ))
                                }
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseModuleAccordian
