// const { Title } = require("chart.js");
const { MongoClient,ObjectId } = require("mongodb");

const MONGO_URI = "mongodb+srv://prarajnaleext:shubhamj10@cluster0.uf9k3.mongodb.net/?retryWrites=true&w=majority";

async function run() {
    try {
        const client = new MongoClient(MONGO_URI);
        await client.connect(); // ✅ Connect to MongoDB

        const db = client.db("test");
        const formsCollection = db.collection("forms");

        console.log("Connected to MongoDB successfully!");

        const form_data = [
            {
                title: "OrG",
                questions: [
                    {   
                        _id: new ObjectId(),
                        text: "Is there a dedicated supplier governance team?",
                        options: ["1. Does not exist but individuals involved in it", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 10
                    },
                    {
                        _id: new ObjectId(),
                        text: "Is there a single point of contact in the governance team for each supplier?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 10
                    },
                    {
                        _id: new ObjectId(),
                        text: "Is the governance team part of all governance meetings with suppliers?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 10
                    },
                    {
                        _id: new ObjectId(),
                        text: "Are roles and responsibilities of the team well defined and understood by all stakeholders?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 10
                    },
                    {
                        _id: new ObjectId(),
                        text: "Is there a well-defined escalation path for the supplier governance team to resolve issues?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 10
                    },
                    {
                        _id: new ObjectId(),
                        text: "Are cross-functional governance processes in place to ensure appropriate involvement of relevant stakeholders?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 10
                    },
                    {
                        _id: new ObjectId(),
                        text: "Is there a supplier governance application used by the organization for automation of processes?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 10
                    },
                    {
                        _id: new ObjectId(),
                        text: "Is there a formal process to take feedback from Suppliers?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 10
                    },
                    {
                        _id: new ObjectId(),
                        text: "Is there a formal process to take feedback from Internal Stakeholders?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 10
                    },
                    {
                        _id: new ObjectId(),
                        text: "Are organizational policies and procedures in place, accessible, understood, and followed by the organization?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 10
                    }
                ],
            },
            {
                title: "BiZ",
                questions: [
                    {
                        _id: new ObjectId(),
                        text: "Are supplier account management organization aligned to client organization?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 12.5,
                    },
                    {
                        _id: new ObjectId(),
                        text: "Are client business stakeholder part of supplier meetings?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 12.5,
                    },
                    {
                        _id: new ObjectId(),
                        text: "Are supplier business plan based on forecast provided by the client?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 12.5,
                    },
                    {
                        _id: new ObjectId(),
                        text: "Is there an evidence that Business Continuity plans are in place, that they are maintained and linked to Disaster Recovery?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 12.5,
                    },
                    {
                        _id: new ObjectId(),
                        text: "Are there common software tools used by both parties?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 10,
                    },
                    {
                        _id: new ObjectId(),
                        text: "Do client and supplier meet for sharing business strategy at least 1 a year?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 10,
                    },
                    {
                        _id: new ObjectId(),
                        text: "The Supplier leadership team works effectively with the client Delivery and Governance organizations to understand and respond to changing business requirements?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 10,
                    },
                    {
                        _id: new ObjectId(),
                        text: "Supplier adheres to Information Technology standards, client policies and procedures?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 10,
                    },
                ]
            },

            {
                title: "CoM",
                questions: [
                    {
                        _id: new ObjectId(),
                        text: "Are supplier contracts (MSA, SOW, WO) stored in a single repository?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 11.11,
                    },
                    {
                        _id: new ObjectId(),
                        text: "Does all relevant stakeholders have access to supplier contract?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 11.11,
                    },
                    {
                        _id: new ObjectId(),
                        text: "Are all contractual deliverables and obligations extracted for all supplier contracts?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 11.11,
                    },
                    {
                        _id: new ObjectId(),
                        text: "Are triggered deliverables and obligations extracted, stored in repository with access to relevant stakeholders?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 11.11,
                    },
                    {
                        _id: new ObjectId(),
                        text: "Does supplier have access to the extracted deliverables and obligations?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 11.11,
                    },
                    {
                        _id: new ObjectId(),
                        text: "Are there owners from client and supplier side for each deliverable and obligation?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 11.11,
                    },
                    {
                        _id: new ObjectId(),
                        text: "Do you have periodic reporting on contractual DnO?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 11.11,
                    },
                    {
                        _id: new ObjectId(),
                        text: "Are DnO approved by various stakeholders on the basis of different DnO category and type?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 11.11,
                    },
                    {
                        _id: new ObjectId(),
                        text: "Is there a formal well-defined contract change management process?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 5.56,
                    },
                    {
                        _id: new ObjectId(),
                        text: "Is there a repository to store redline versions of contract changes?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 5.56,
                    },
                ],
            },
            {
                title: "PeM",
                questions: [
                    {_id: new ObjectId(), text: "Are all contractual Service level metrics extracted along with calculation methodologies for all supplier contract?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Do you use any application for tracking Service Levels, along with approval workflow?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Does supplier submits back up data for each service level for audit?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Does the governance team re-calculates / validates Service Level score based on the data provided by the supplier?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Are Service level waivers approved by multiple stakeholders?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Is a meeting setup with respective stakeholders for Service Level reporting?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Is there a formal process to conduct End User Satisfaction for the supplier?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Are surveys conducted by a 3rd Party approved by the client?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Are survey results shared with the Governance Team?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Is an action plan created, approved, and implemented for improving areas with low scores?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 }
                ]
            },
            {
                title: "FiM",
                questions: [
                    {_id: new ObjectId(),text: "Does supplier submit back-up data for each line item of the invoice for audit?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(),text: "Are the consumption of supplier services tracked and reported monthly?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(),text: "Is there a formal cross-functional process for invoice approval?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(),text: "Are financial practices documented, and audits conducted?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(),text: "Is there a well-defined methodology to calculate performance credits and Earnbacks?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(),text: "Are performance credits reported monthly and included in invoices?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(),text: "Do you track and report actual spend against contract base and variable charges?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(),text: "Do you use any application for Invoice management, Financial Analysis, and Planning?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(),text: "Is financial analysis shared with the supplier monthly?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(),text: "Is the supplier informed about major changes in base units/services?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 }

                ]
            },
            {
                title: "VeA",
                questions: [
                    {_id: new ObjectId(), text: "Does governance team track PO/WO for all suppliers?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Are burn rates tracked for PO's issued to supplier?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Is spend pool tracked for supplier and reported periodically?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Is there a formal process to conduct satisfaction scores for suppliers?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Are survey results shared with the Governance Team?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Are interpretations conducted to align supplier understanding of contracts?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Is there a formal process to conduct contract interpretation?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Does the supplier have access to request contract interpretation?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Is there any software application used for spend pool?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Is there an application to create a knowledge base or FAQ for supplier contracts?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 }

                ]
            },
            {
                title: "Rem",
                questions: [
                    {
                        _id: new ObjectId(),
                        text: "Are calendars blocked for all governance meetings as per the supplier contract?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 10
                    },
                    {
                        _id: new ObjectId(),
                        text: "Is agenda and participants identified and informed about these meetings?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 10
                    },
                    {
                        _id: new ObjectId(),
                        text: "Is the attendance tracked for these meetings?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 10
                    },
                    {
                        _id: new ObjectId(),
                        text: "Do client and supplier have access to common application for accessing action items or minutes of the meeting?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 10
                    },
                    {
                        _id: new ObjectId(),
                        text: "Are owners assigned for each action item from both parties?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 10
                    },
                    {
                        _id: new ObjectId(),
                        text: "Is aging and cycle time of actions or issues raised in the meeting tracked?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 10
                    },
                    {
                        _id: new ObjectId(),
                        text: "Are there any parameters apart from SL that are tracked to measure supplier's overall performance?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 10
                    },
                    {
                        _id: new ObjectId(),
                        text: "Are these parameters shared with the supplier?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 10
                    },
                    {
                        _id: new ObjectId(),
                        text: "Are the weightages of various parameters aligned to business requirements?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 10
                    },
                    {
                        _id: new ObjectId(),
                        text: "Is the scorecard shared with stakeholders or discussed during governance meetings?",
                        options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                        weightage: 10
                    }

                ]
            },
            {
                title: "Prm",
                questions: [
                    {_id: new ObjectId(), text: "Are milestones extracted from each SOW/PO/WO?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Are these milestones have acceptance criteria with multiple approval levels?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Do all milestone have owner and approver?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Are milestone linked to each other and impact analysis conducted for change in dates?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Are Work Order included as additional spend on supplier?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Does WO included named resources along with roles?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Are roles given in WO aligned with the rate cards?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Are timesheets tracked for all T&M WO?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Is their any application used for tracking WO?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Is their a process to renew, terminate or close WO?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 }

                ]
            },
            {
                title: "CmA",
                questions: [
                    {_id: new ObjectId(), text: "Are all compliance obligations extracted from all supplier contracts?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Does all supplier stakeholders have access to compliance obligations?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Does supplier have access to all client policies for compliance?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Is their a well defined process to accept compliance obligations?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Do you have periodic reporting on regulations and policies referred in supplier contract?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Do you have process to share policy and regulatory updates with Supplier?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Do you have corporate functions responsible for policy and regulatory compliance?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Do you conduct periodic meeting between Governance and corporate risk and compliance teams?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Is corporate compliance team involved during supplier audits?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Do you have any software application for tracking regulatory compliance?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 }

                ]
            },
            {
                title: "RiA",
                questions: [
                    {_id: new ObjectId(), text: "Are all compliance obligations extracted from all supplier contracts?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Does all supplier stakeholders have access to compliance obligations?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Does supplier have access to all client policies for compliance?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Is their a well defined process to accept compliance obligations?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Do you have periodic reporting on regulations and policies referred in supplier contract?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Do you have process to share policy and regulatory updates with Supplier?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Do you have corporate functions responsible for policy and regulatory compliance?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Do you conduct periodic meeting between Governance and corporate risk and compliance teams?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Is corporate compliance team involved during supplier audits?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 },
                    {_id: new ObjectId(), text: "Do you have any software application for tracking regulatory compliance?", options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], weightage: 10 }

                ]
            }
        ];

        const result = await formsCollection.insertMany(form_data);
        console.log(`Inserted ${result.insertedCount} forms successfully.`);

        await client.close();
    }

    catch (error) {
        console.error("Error connecting to MongoDB:")
    }
}

run().catch(console.error);