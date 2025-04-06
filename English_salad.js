function shortify()

{

var input_text = document.getElementById('GetMedNotes').value;

//PATHOLOGY

var replace_text = input_text.replace(/differential diagnosis/gi,"DDx");
var replace_text = replace_text.replace(/differential diagnoses/gi,"DDx");
var replace_text = replace_text.replace(/hypertension/gi,"HTN");
var replace_text = replace_text.replace(/essential HTN/gi,"HTN");
var replace_text = replace_text.replace(/st-segment/gi,"ST");
var replace_text = replace_text.replace(/st segment/gi,"ST");
var replace_text = replace_text.replace(/st elevation myocardial infarction/gi,"STEMI");
var replace_text = replace_text.replace(/st elevation mi/gi,"STEMI");
var replace_text = replace_text.replace(/st-elevation mi/gi,"STEMI");
var replace_text = replace_text.replace(/non st elevation myocardial infarction/gi,"NSTEMI");
var replace_text = replace_text.replace(/non st elevation mi/gi,"NSTEMI");
var replace_text = replace_text.replace(/non-st elevation mi/gi,"NSTEMI");
var replace_text = replace_text.replace(/myocardial infarction/gi,"MI");
var replace_text = replace_text.replace(/non-stemi/gi,"NSTEMI");
var replace_text = replace_text.replace(/normal sinus rhythm/gi,"NSR");
var replace_text = replace_text.replace(/right bundle branch block/gi,"RBBB");
var replace_text = replace_text.replace(/left bundle branch block/gi,"LBBB");
var replace_text = replace_text.replace(/ventricular tachycardia/gi,"V-Tach");
var replace_text = replace_text.replace(/congestive heart failure/gi,"CHF");
var replace_text = replace_text.replace(/coronary artery disease/gi,"CAD");
var replace_text = replace_text.replace(/coronary disease/gi,"CAD");
var replace_text = replace_text.replace(/heart failure/gi,"HF");
var replace_text = replace_text.replace(/atrial fibrillation/gi,"A-Fib");
var replace_text = replace_text.replace(/Paroxysmal atrial fibrillation/gi,"Parox-AFib");
var replace_text = replace_text.replace(/rapid ventricular rhythm/gi,"RVR");
var replace_text = replace_text.replace(/left ventricular hypertrophy/gi,"LVH");

var replace_text = replace_text.replace(/peripheral vascular disease/gi,"PVD");
var replace_text = replace_text.replace(/peripheral arterial disease/gi,"PVD");
var replace_text = replace_text.replace(/peripheral vessel disease/gi,"PVD");

var replace_text = replace_text.replace(/hyperlipidemia/gi,"HLP");
var replace_text = replace_text.replace(/hypercholesterolemia/gi,"HLP");
var replace_text = replace_text.replace(/dyslipidemia/gi,"HLP");
var replace_text = replace_text.replace(/Motor vehicle accident/gi,"MVA");

var replace_text = replace_text.replace(/chronic obstructive pulmonary disease/gi,"COPD");
var replace_text = replace_text.replace(/Acute respiratory failure with hypoxia/gi,"Acute hypoxic resp. failure");
var replace_text = replace_text.replace(/obstructive sleep apnea/gi,"OSA");
var replace_text = replace_text.replace(/obesity hypoventilation syndrome/gi,"OHS");
var replace_text = replace_text.replace(/interstitial lung disease/gi,"ILD");
var replace_text = replace_text.replace(/sleep apnea/gi,"OSA");
var replace_text = replace_text.replace(/pneumonia/gi,"PNA");
var replace_text = replace_text.replace(/pulmonary embolus/gi,"PE");
var replace_text = replace_text.replace(/pulmonary embolism/gi,"PE");
var replace_text = replace_text.replace(/pulmonary emboli/gi,"PE");

var replace_text = replace_text.replace(/Lung Cancer/gi,"Lung Ca.");

var replace_text = replace_text.replace(/stroke/gi,"CVA");
var replace_text = replace_text.replace(/cerebrovascular accident/gi,"CVA");
var replace_text = replace_text.replace(/subarachnoid hemorrhage/gi,"SAH");
var replace_text = replace_text.replace(/subdural hematoma/gi,"SDH");
var replace_text = replace_text.replace(/room spinning sensation/gi,"vertigo");
var replace_text = replace_text.replace(/felt like the room was spinning/gi,"had vertigo");
var replace_text = replace_text.replace(/restless leg syndrome/gi,"RLS");

var replace_text = replace_text.replace(/Acute blood loss anemia/gi,"ABL Anemia");

var replace_text = replace_text.replace(/Non-Insulin dependent diabetes mellitus/gi,"NIDDM");
var replace_text = replace_text.replace(/Non Insulin dependent diabetes mellitus/gi,"NIDDM");
var replace_text = replace_text.replace(/Insulin-dependent diabetes mellitus/gi,"IDDM");
var replace_text = replace_text.replace(/Insulin dependent diabetes mellitus/gi,"IDDM");
var replace_text = replace_text.replace(/Type 2 diabetes mellitus/gi,"DMT2");
var replace_text = replace_text.replace(/Type 1 diabetes mellitus/gi,"DMT1");
var replace_text = replace_text.replace(/Type two diabetes/gi,"DMT2");
var replace_text = replace_text.replace(/Type one diabetes/gi,"DMT1");
var replace_text = replace_text.replace(/diabetes type one/gi,"DMT2");
var replace_text = replace_text.replace(/diabetes type two/gi,"DMT1");
var replace_text = replace_text.replace(/Type 1 DM/gi,"DMT1");
var replace_text = replace_text.replace(/Type 2 Diabetes/gi,"DMT2");
var replace_text = replace_text.replace(/Type 1 Diabetes/gi,"DMT1");
var replace_text = replace_text.replace(/Type 2 DM/gi,"DMT2");
var replace_text = replace_text.replace(/Type 1 DM/gi,"DMT1");
var replace_text = replace_text.replace(/Diabetes Type 1/gi,"DMT1");
var replace_text = replace_text.replace(/Diabetes Type 2/gi,"DMT2");
var replace_text = replace_text.replace(/Diabetes Type-1/gi,"DMT1");
var replace_text = replace_text.replace(/Diabetes Type-2/gi,"DMT2");
var replace_text = replace_text.replace(/Diabetes Type1/gi,"DMT1");
var replace_text = replace_text.replace(/Diabetes Type1/gi,"DMT2");

var replace_text = replace_text.replace(/diabetes mellitus type 2/gi,"DM2");
var replace_text = replace_text.replace(/diabetes mellitus type2/gi,"DM2");
var replace_text = replace_text.replace(/diabetes mellitus/gi,"DM");
var replace_text = replace_text.replace(/prediabetes/gi,"pre-DM2");
var replace_text = replace_text.replace(/pre-diabetes/gi,"pre-DM2");



var replace_text = replace_text.replace(/acute kidney injury/gi,"AKI");
var replace_text = replace_text.replace(/acute renal failure/gi,"AKI");
var replace_text = replace_text.replace(/chronic kidney disease/gi,"CKD");
var replace_text = replace_text.replace(/end stage renal disease/gi,"ESRD");
var replace_text = replace_text.replace(/end-stage renal disease/gi,"ESRD");
var replace_text = replace_text.replace(/end stage renal failure/gi,"ESRD");
var replace_text = replace_text.replace(/end-stage renal failure/gi,"ESRD");
var replace_text = replace_text.replace(/end stage kidney disease/gi,"ESRD");
var replace_text = replace_text.replace(/end-stage kidney disease/gi,"ESRD");
var replace_text = replace_text.replace(/end stage kidney failure/gi,"ESRD");
var replace_text = replace_text.replace(/end-stage kidney failure/gi,"ESRD");
var replace_text = replace_text.replace(/acute on chronic kidney failure/gi,"AKI on CKD");
var replace_text = replace_text.replace(/acute on chronic renal failure/gi,"AKI on CKD");
var replace_text = replace_text.replace(/renal cell cancer/gi,"RCC");
var replace_text = replace_text.replace(/renal cell carcinoma/gi,"RCC");
var replace_text = replace_text.replace(/urinary tract infection/gi,"UTI");

var replace_text = replace_text.replace(/end stage liver disease/gi,"ESLD");
var replace_text = replace_text.replace(/end-stage liver disease/gi,"ESLD");
var replace_text = replace_text.replace(/hepatorenal syndrome/gi,"HRS");
var replace_text = replace_text.replace(/hepato-renal syndrome/gi,"HRS");
var replace_text = replace_text.replace(/hepato renal syndrome/gi,"HRS");

var replace_text = replace_text.replace(/Alpha-1 antitrypsin/gi,"AAT");

var replace_text = replace_text.replace(/gastroesophageal reflux disease/gi,"GERD");
var replace_text = replace_text.replace(/gastrointestinal bleed/gi,"GI bleed");
var replace_text = replace_text.replace(/acid reflux disease/gi,"GERD");
var replace_text = replace_text.replace(/acid reflux/gi,"GERD");
var replace_text = replace_text.replace(/peptic ulcer disease/gi,"PUD");
var replace_text = replace_text.replace(/gastric ulcer/gi,"GU");
var replace_text = replace_text.replace(/duodenal ulcer/gi,"DU");
var replace_text = replace_text.replace(/cholelithiasis/gi,"gallstones");
var replace_text = replace_text.replace(/choledocholithiasis/gi,"CBD-stones");
var replace_text = replace_text.replace(/helicobacter pylori/gi,"H.pylori");
var replace_text = replace_text.replace(/C.Difficile/gi,"C.Diff.");
var replace_text = replace_text.replace(/Clostridium Difficile/gi,"C.Diff.");
var replace_text = replace_text.replace(/small bowel obstruction/gi,"SBO");
var replace_text = replace_text.replace(/Colon Cancer/gi,"Colon Ca.");
var replace_text = replace_text.replace(/Colonic Cancer/gi,"Colon Ca.");
var replace_text = replace_text.replace(/Rectal Cancer/gi,"Rectal Ca.");
var replace_text = replace_text.replace(/fatty infiltration of the liver/gi,"Fatty Liver");
var replace_text = replace_text.replace(/degenerative joint disease/gi,"DJD");
var replace_text = replace_text.replace(/rheumatoid arthritis/gi,"RA");
var replace_text = replace_text.replace(/breast Cancer/gi,"Breast Ca.");
var replace_text = replace_text.replace(/alcoholism/gi,"ETOH-ism");
var replace_text = replace_text.replace(/deep vein thrombosis/gi,"DVT");
var replace_text = replace_text.replace(/spontaneous bacterial peritonitis/gi,"SBP");
var replace_text = replace_text.replace(/liver cirrhosis/gi,"cirrhosis");
var replace_text = replace_text.replace(/hepatitis C/gi,"Hep-C");
var replace_text = replace_text.replace(/hepatitis B/gi,"Hep-B");
var replace_text = replace_text.replace(/hepatitis A/gi,"Hep-A");
var replace_text = replace_text.replace(/hepatocellular cancer/gi,"HCC");
var replace_text = replace_text.replace(/hepatocellular carcinoma/gi,"HCC");
var replace_text = replace_text.replace(/abdominal ascites/gi,"ascites");

var replace_text = replace_text.replace(/Squamous Cell carcinoma/gi,"SCC");
var replace_text = replace_text.replace(/Squamous Cell cancer/gi,"SCC");
var replace_text = replace_text.replace(/Squamous Cell Ca/gi,"SCC");
var replace_text = replace_text.replace(/metastatic disease/gi,"Metastasis");
var replace_text = replace_text.replace(/diffuse large B-cell lymphoma/gi,"DLBCL");
var replace_text = replace_text.replace(/Non-small cell lung cancer/gi,"NSCLC");
var replace_text = replace_text.replace(/Non small cell lung cancer/gi,"NSCLC");

var replace_text = replace_text.replace(/metastatic lesions/gi,"metastasis");
var replace_text = replace_text.replace(/metastatic spread to the/gi,"mets to");

var replace_text = replace_text.replace(/tobacco use disorder/gi,"tobacco dependence");

var replace_text = replace_text.replace(/methicillin resistant Staphylococcus aureus/gi,"MRSA");
var replace_text = replace_text.replace(/methicillin-resistant Staphylococcus aureus/gi,"MRSA");
var replace_text = replace_text.replace(/methicillin sensitive Staphylococcus aureus/gi,"MSSA");
var replace_text = replace_text.replace(/methicillin-sensitive Staphylococcus aureus/gi,"MSSA");


var replace_text = replace_text.replace(/benign prostatic hypertrophy/gi,"BPH");
var replace_text = replace_text.replace(/benign prostate hypertrophy/gi,"BPH");
var replace_text = replace_text.replace(/benign prostatic hyperplasia/gi,"BPH");
var replace_text = replace_text.replace(/benign prostate hyperplasia/gi,"BPH");
var replace_text = replace_text.replace(/benign prostate enlargement/gi,"BPH");



//ANATOMICAL

var replace_text = replace_text.replace(/common bile duct/gi,"CBD");
var replace_text = replace_text.replace(/gallbladder/gi,"GB");
var replace_text = replace_text.replace(/gall bladder/gi,"GB");
var replace_text = replace_text.replace(/lymph nodes/gi,"LNs");
var replace_text = replace_text.replace(/lymph node/gi,"LN");
var replace_text = replace_text.replace(/lymphnode/gi,"LN");
var replace_text = replace_text.replace(/lymphnodes/gi,"LNs");
var replace_text = replace_text.replace(/atrioventricular/gi,"AV");
var replace_text = replace_text.replace(/Abdominal pain localized to the RUQ/gi,"RUQ Abd. pain");

var replace_text = replace_text.replace(/lower extremities/gi,"legs");
var replace_text = replace_text.replace(/upper extremities/gi,"arms");




//SYMPTOMS

var replace_text = replace_text.replace(/sudden onset of/gi,"acute");
var replace_text = replace_text.replace(/new onset of/gi,"acute");
var replace_text = replace_text.replace(/new onset/gi,"acute");
var replace_text = replace_text.replace(/all of a sudden developed/gi,"had acute");
var replace_text = replace_text.replace(/started noticing/gi,"had");
var replace_text = replace_text.replace(/intermittent outbreaks of/gi,"recurrent");

var replace_text = replace_text.replace(/had no symptoms/gi,"was asymptomatic");
var replace_text = replace_text.replace(/altered mental status/gi,"AMS");
var replace_text = replace_text.replace(/confusion/gi,"AMS");
var replace_text = replace_text.replace(/not acting herself/gi,"confused");
var replace_text = replace_text.replace(/not acting himself/gi,"confused");

var replace_text = replace_text.replace(/feeling under the weather/gi,"feeling sick");
var replace_text = replace_text.replace(/not feeling well/gi,"feeling ill");
var replace_text = replace_text.replace(/generalized fatigue/gi,"fatigue");
var replace_text = replace_text.replace(/tired-looking/gi,"fatigued");

var replace_text = replace_text.replace(/complaint of/gi,"c/o");
var replace_text = replace_text.replace(/complaints of/gi,"c/o");
var replace_text = replace_text.replace(/complains of/gi,"c/o");
var replace_text = replace_text.replace(/complained of/gi,"c/o");
var replace_text = replace_text.replace(/complaining of/gi,"c/o");
var replace_text = replace_text.replace(/short of breath/gi,"SOB");
var replace_text = replace_text.replace(/having difficulty breathing/gi,"dyspneic");
var replace_text = replace_text.replace(/having trouble breathing/gi,"dyspneic");
var replace_text = replace_text.replace(/having trouble catching his breath/gi,"dyspneic");
var replace_text = replace_text.replace(/having trouble catching her breath/gi,"dyspneic");
var replace_text = replace_text.replace(/dyspnea worse with laying flat/gi,"orthopnea");
var replace_text = replace_text.replace(/SOB worse with laying flat/gi,"orthopnea");
var replace_text = replace_text.replace(/shortness of breath/gi,"SOB");
var replace_text = replace_text.replace(/dyspnea on exertion/gi,"exertional SOB");
var replace_text = replace_text.replace(/dyspnea/gi,"SOB");
var replace_text = replace_text.replace(/SOB on exertion/gi,"exertional dyspnea");
var replace_text = replace_text.replace(/increased work of breathing/gi,"labored breathing");
var replace_text = replace_text.replace(/struggling to breathe/gi,"dyspneic");
var replace_text = replace_text.replace(/struggled to breathe/gi,"was dyspneic");

var replace_text = replace_text.replace(/was coughing up blood/gi,"had hemoptysis");
var replace_text = replace_text.replace(/coughing up blood/gi,"hemoptysis");
var replace_text = replace_text.replace(/coughed up blood/gi,"had hemoptysis");
var replace_text = replace_text.replace(/was coughing up blood/gi,"had hemoptysis");
var replace_text = replace_text.replace(/was coughing up any blood/gi,"had hemoptysis");
var replace_text = replace_text.replace(/cough with sputum/gi,"productive cough");
var replace_text = replace_text.replace(/cough with expectoration of sputum/gi,"productive cough");
var replace_text = replace_text.replace(/cough with expectoration of phlegm/gi,"productive cough");
var replace_text = replace_text.replace(/cough with sputum/gi,"productive cough");
var replace_text = replace_text.replace(/cough with phlegm/gi,"productive cough");
var replace_text = replace_text.replace(/cough productive of yellow sputum/gi,"purulent cough");
var replace_text = replace_text.replace(/cough productive of yellow phlegm/gi,"purulent cough");

var replace_text = replace_text.replace(/felt like his heart was racing/gi,"had palpitations");
var replace_text = replace_text.replace(/felt like her heart was racing/gi,"had palpitations");
var replace_text = replace_text.replace(/felt like his heart was pounding/gi,"had palpitations");
var replace_text = replace_text.replace(/felt like her heart was pounding/gi,"had palpitations");
var replace_text = replace_text.replace(/felt like his chest was pounding/gi,"had palpitations");
var replace_text = replace_text.replace(/felt like her chest was pounding/gi,"had palpitations");
var replace_text = replace_text.replace(/a racing heart/gi,"palpitations");

var replace_text = replace_text.replace(/gastrointestinal/gi,"GI");
var replace_text = replace_text.replace(/vomitting/gi,"vomiting");
var replace_text = replace_text.replace(/Nausea or vomiting or diarrhea/gi,"N/V/D");
var replace_text = replace_text.replace(/Nausea, vomiting and diarrhea/gi,"N/V/D");
var replace_text = replace_text.replace(/Nausea, vomiting with diarrhea/gi,"N/V/D");
var replace_text = replace_text.replace(/Nausea, vomiting & diarrhea/gi,"N/V/D");
var replace_text = replace_text.replace(/Nausea, vomiting, diarrhea/gi,"N/V/D");
var replace_text = replace_text.replace(/Nausea, emesis, diarrhea/gi,"N/V/D");
var replace_text = replace_text.replace(/Nausea and emesis with diarrhea/gi,"N/V/D");
var replace_text = replace_text.replace(/Nausea and vomiting with diarrhea/gi,"N/V/D");
var replace_text = replace_text.replace(/Nausea and vomiting/gi,"N/V");
var replace_text = replace_text.replace(/Nausea or vomiting/gi,"N/V");
var replace_text = replace_text.replace(/Nausea, vomiting/gi,"N/V");
var replace_text = replace_text.replace(/Nausea,vomiting/gi,"N/V");
var replace_text = replace_text.replace(/Nausea, and vomiting/gi,"N/V");
var replace_text = replace_text.replace(/Nausea & vomiting/gi,"N/V");
var replace_text = replace_text.replace(/Nausea or emesis/gi,"N/V");
var replace_text = replace_text.replace(/Nausea and emesis/gi,"N/V");
var replace_text = replace_text.replace(/Nausea & emesis/gi,"N/V");
var replace_text = replace_text.replace(/Nausea with vomitting/gi,"N/V");

var replace_text = replace_text.replace(/a lack of appetite/gi,"anorexia");
var replace_text = replace_text.replace(/lack of appetite/gi,"anorexia");
var replace_text = replace_text.replace(/a loss of appetite/gi,"anorexia");
var replace_text = replace_text.replace(/loss of appetite/gi,"anorexia");
var replace_text = replace_text.replace(/a lost appetite/gi,"anorexia");
var replace_text = replace_text.replace(/lost appetite/gi,"anorexia");
var replace_text = replace_text.replace(/a low appetite/gi,"anorexia");
var replace_text = replace_text.replace(/low appetite/gi,"anorexia");
var replace_text = replace_text.replace(/a poor appetite/gi,"anorexia");
var replace_text = replace_text.replace(/poor appetite/gi,"anorexia");
var replace_text = replace_text.replace(/lost all appetite/gi,"anorexia");
var replace_text = replace_text.replace(/lost all his appetite/gi,"anorexia");
var replace_text = replace_text.replace(/lost all her appetite/gi,"anorexia");
var replace_text = replace_text.replace(/has maintained anorexia/gi,"has anorexia");

var replace_text = replace_text.replace(/trouble swallowing/gi,"dysphagia");
var replace_text = replace_text.replace(/difficultly swallowing/gi,"dysphagia");

var replace_text = replace_text.replace(/abdominal pain/gi,"abd. pain");
var replace_text = replace_text.replace(/Loss of consciousness/gi,"LOC");
var replace_text = replace_text.replace(/did not lose consciousness/gi,"No LOC");
var replace_text = replace_text.replace(/Weight loss/gi,"Wt.loss");
var replace_text = replace_text.replace(/pins-and-needles sensation/gi,"parasthesia");
var replace_text = replace_text.replace(/pins-and-needles sensations/gi,"parasthesias");
var replace_text = replace_text.replace(/pins-and-needles/gi,"parasthesias");
var replace_text = replace_text.replace(/joint pain/gi,"arthalgia");
var replace_text = replace_text.replace(/joint pains/gi,"arthalgias");
var replace_text = replace_text.replace(/charlie horses/gi,"cramps");
var replace_text = replace_text.replace(/memory impairment/gi,"memory loss");
var replace_text = replace_text.replace(/an episode of lightheadedness/gi,"a presyncopal episode");
var replace_text = replace_text.replace(/a episode of lightheadedness/gi,"a presyncopal episode");
var replace_text = replace_text.replace(/bowel movement/gi,"BM");
var replace_text = replace_text.replace(/loose in consistency/gi,"loose");
var replace_text = replace_text.replace(/black stools/gi,"melena");
var replace_text = replace_text.replace(/black stool/gi,"melena");
var replace_text = replace_text.replace(/black tarry stools/gi,"melena");
var replace_text = replace_text.replace(/black tarry stool/gi,"melena");
var replace_text = replace_text.replace(/black melanotic stools/gi,"melena");
var replace_text = replace_text.replace(/black melanotic stool/gi,"melena");
var replace_text = replace_text.replace(/melanotic stools/gi,"melena");
var replace_text = replace_text.replace(/melanotic stool/gi,"melena");
var replace_text = replace_text.replace(/black bowel movements/gi,"melena");
var replace_text = replace_text.replace(/black bowel movement/gi,"melena");
var replace_text = replace_text.replace(/blood in stool/gi,"hematochezia");
var replace_text = replace_text.replace(/bright red blood per rectum/gi,"hematochezia");

var replace_text = replace_text.replace(/episodes of diarrhea/gi,"diarrhea");
var replace_text = replace_text.replace(/loose stools/gi,"diarrhea");

var replace_text = replace_text.replace(/pain in the back/gi,"back-pain");
var replace_text = replace_text.replace(/pain in her back/gi,"back-pain");
var replace_text = replace_text.replace(/pain in his back/gi,"back-pain");

var replace_text = replace_text.replace(/threw up/gi,"puked");
var replace_text = replace_text.replace(/throwing up/gi,"puking");
var replace_text = replace_text.replace(/feeling lightheaded/gi,"feeling dizzy");
var replace_text = replace_text.replace(/distention of the abdomen/gi,"abdominal distention");
var replace_text = replace_text.replace(/distention of abdomen/gi,"abdominal distention");
var replace_text = replace_text.replace(/distention of his abdomen/gi,"abdominal distention");
var replace_text = replace_text.replace(/distention of her abdomen/gi,"abdominal distention");


var replace_text = replace_text.replace(/increased frequency of urination/gi,"polyuria");
var replace_text = replace_text.replace(/reduced urine output/gi,"oliguria");
var replace_text = replace_text.replace(/decreased urine output/gi,"oliguria");
var replace_text = replace_text.replace(/decrease in urine output/gi,"oliguria");

var replace_text = replace_text.replace(/bloody urine/gi,"hematuria");
var replace_text = replace_text.replace(/blood in urine/gi,"hematuria");
var replace_text = replace_text.replace(/blood in his urine/gi,"hematuria");
var replace_text = replace_text.replace(/blood in her urine/gi,"hematuria");
var replace_text = replace_text.replace(/bloody urine/gi,"hematuria");
var replace_text = replace_text.replace(/started peeing blood/gi,"had hematuria");
var replace_text = replace_text.replace(/was peeing blood/gi,"had hematuria");
var replace_text = replace_text.replace(/has been peeing blood/gi,"has hematuria");

var replace_text = replace_text.replace(/leg swelling/gi,"leg edema");
var replace_text = replace_text.replace(/swelling of this legs/gi,"leg edema");
var replace_text = replace_text.replace(/swelling in his legs/gi,"leg edema");
var replace_text = replace_text.replace(/swelling of lower extremities/gi,"leg edema");

var replace_text = replace_text.replace(/black stools/gi,"melena");
var replace_text = replace_text.replace(/melanotic stools/gi,"melena");
var replace_text = replace_text.replace(/black tarry stools/gi,"melena");
var replace_text = replace_text.replace(/dark tarry stools/gi,"melena");

var replace_text = replace_text.replace(/syncopal episode/gi,"syncope");
var replace_text = replace_text.replace(/within her baseline range/gi,"at her baseline");
var replace_text = replace_text.replace(/within his baseline range/gi,"at his baseline");
var replace_text = replace_text.replace(/baseline seems to be around/gi,"baseline ~");
var replace_text = replace_text.replace(/baseline is around/gi,"baseline ~");
var replace_text = replace_text.replace(/baseline appears to be ~/gi,"baseline ~");
var replace_text = replace_text.replace(/baseline estimated to be around/gi,"baseline ~");
var replace_text = replace_text.replace(/baseline approximately around/gi,"baseline ~");
var replace_text = replace_text.replace(/baseline creatinine around/gi,"baseline creatinine ~");
var replace_text = replace_text.replace(/baseline creatinine is around/gi,"baseline creatinine ~");

var replace_text = replace_text.replace(/reported that she had some/gi,"had");
var replace_text = replace_text.replace(/reported that he had some/gi,"had");
var replace_text = replace_text.replace(/reported that she had/gi,"had");
var replace_text = replace_text.replace(/reported that he had/gi,"had");

var replace_text = replace_text.replace(/oxygen requirements/gi,"O2 needs");

var replace_text = replace_text.replace(/trouble sleeping/gi,"insomnia");
var replace_text = replace_text.replace(/difficulty sleeping/gi,"insomnia");
var replace_text = replace_text.replace(/trouble falling asleep/gi,"insomnia");
var replace_text = replace_text.replace(/difficulty falling asleep/gi,"insomnia");

var replace_text = replace_text.replace(/decline in functional status/gi,"functional decline");

var replace_text = replace_text.replace(/was unsteady on his feet/gi,"had unsteady gait");
var replace_text = replace_text.replace(/was unsteady on her feet/gi,"had unsteady gait");
var replace_text = replace_text.replace(/unsteady while walking/gi,"unsteady gait");
var replace_text = replace_text.replace(/unsteady while ambulating/gi,"unsteady gait");

var replace_text = replace_text.replace(/continued to have/gi,"had persistent");
var replace_text = replace_text.replace(/continues to have/gi,"has persistent");

//PROCEDURES

var replace_text = replace_text.replace(/after the procedure/gi,"post-procedure");

var replace_text = replace_text.replace(/history and physical/gi,"H & P");
var replace_text = replace_text.replace(/physical exam/gi,"Exam");
var replace_text = replace_text.replace(/a thorough physical exam/gi,"an exam");
var replace_text = replace_text.replace(/on examination/gi,"on exam");

var replace_text = replace_text.replace(/extensive imaging/gi,"imaging");


var replace_text = replace_text.replace(/chest xray/gi,"CXR");
var replace_text = replace_text.replace(/chest x-ray/gi,"CXR");
var replace_text = replace_text.replace(/chest radiograph/gi,"CXR");
var replace_text = replace_text.replace(/ultrasound/gi,"U/S");
var replace_text = replace_text.replace(/ultra-sound/gi,"U/S");
var replace_text = replace_text.replace(/CT of the Head/gi,"Head-CT");
var replace_text = replace_text.replace(/CT of Head/gi,"Head-CT");
var replace_text = replace_text.replace(/CT-scan of the Head/gi,"Head-CT");
var replace_text = replace_text.replace(/CT scan of the Head/gi,"Head-CT");
var replace_text = replace_text.replace(/CT-scan of Head/gi,"Head-CT");
var replace_text = replace_text.replace(/CT scan of Head/gi,"Head-CT");
var replace_text = replace_text.replace(/CT head without contrast/gi,"Plain Head-CT");
var replace_text = replace_text.replace(/CT-head without contrast/gi,"Plain Head-CT");

var replace_text = replace_text.replace(/CT of the Chest/gi,"Chest-CT");
var replace_text = replace_text.replace(/CT of Chest/gi,"Chest-CT");
var replace_text = replace_text.replace(/CT-scan of the Chest/gi,"Chest-CT");
var replace_text = replace_text.replace(/CT scan of the Chest/gi,"Chest-CT");
var replace_text = replace_text.replace(/CT-scan of Chest/gi,"Chest-CT");
var replace_text = replace_text.replace(/CT scan of Chest/gi,"Chest-CT");

var replace_text = replace_text.replace(/CT Abdomen pelvis/gi,"CT-AP");
var replace_text = replace_text.replace(/CT Abdomen-pelvis/gi,"CT-AP");
var replace_text = replace_text.replace(/CT of the Abdomen-pelvis/gi,"CT-AP");
var replace_text = replace_text.replace(/CT of Abdomen-pelvis/gi,"CT-AP");
var replace_text = replace_text.replace(/CT-scan of the Abdomen-pelvis/gi,"CT-AP");
var replace_text = replace_text.replace(/CT scan Abdomen-pelvis/gi,"CT-AP");
var replace_text = replace_text.replace(/CT scan of Abdomen-pelvis/gi,"CT-AP");
var replace_text = replace_text.replace(/CT angiogram/gi,"CTA");
var replace_text = replace_text.replace(/angiography study/gi,"angiogram");
var replace_text = replace_text.replace(/MRI of the Brain/gi,"Brain-MRI");

var replace_text = replace_text.replace(/echocardiogram/gi, "ECHO");
var replace_text = replace_text.replace(/coronary artery bypass grafting/gi, "CABG");
var replace_text = replace_text.replace(/coronary artery bypass graft/gi, "CABG");
var replace_text = replace_text.replace(/coronary artery bypass/gi, "CABG");
var replace_text = replace_text.replace(/quadruple bypass/gi, "CABG X 4");

var replace_text = replace_text.replace(/electrocardiogram/gi, "EKG");
var replace_text = replace_text.replace(/electrocardiographic/gi, "EKG");
var replace_text = replace_text.replace(/ejection fraction/gi,"EF");

var replace_text = replace_text.replace(/biopsy/gi,"Bx");

var replace_text = replace_text.replace(/Pulmonary Function test/gi,"PFT");
var replace_text = replace_text.replace(/endobronchial ultrasound/gi,"EBUS");
var replace_text = replace_text.replace(/endobronchial U\/S/gi,"EBUS");
var replace_text = replace_text.replace(/endobronchial US/gi,"EBUS");
var replace_text = replace_text.replace(/Bronchoscopy/gi,"Bronch.");
var replace_text = replace_text.replace(/Kidney Transplantation/gi,"Renal-TX");
var replace_text = replace_text.replace(/Kidney Transplant/gi,"Renal-TX");
var replace_text = replace_text.replace(/Renal Transplantation/gi,"Renal-TX");
var replace_text = replace_text.replace(/Renal Transplant/gi,"Renal-TX");
var replace_text = replace_text.replace(/Hemodialysis/gi,"HD");
var replace_text = replace_text.replace(/Monday, wednesday and friday/gi,"MWF");
var replace_text = replace_text.replace(/Monday, wednesday & friday/gi,"MWF");
var replace_text = replace_text.replace(/Monday, wednesday, friday/gi,"MWF");
var replace_text = replace_text.replace(/Anticoagulation/gi,"Anticoag");
var replace_text = replace_text.replace(/Laparoscopic cholecystectomy/gi,"Lap.chole");
var replace_text = replace_text.replace(/Transesophageal echocardiogram/gi,"TEE");
var replace_text = replace_text.replace(/Appendectomy/gi,"Appy");
var replace_text = replace_text.replace(/Bronchoscopy/gi,"Bronch");
var replace_text = replace_text.replace(/nasogastric tube/gi,"NG");
var replace_text = replace_text.replace(/orogastric tube/gi,"OG");
var replace_text = replace_text.replace(/Percutaneous gastrojejunostomy tube /gi,"PEG Tube");
var replace_text = replace_text.replace(/Foley catheter/gi,"Foley C.");
var replace_text = replace_text.replace(/Foley cath/gi,"Foley C.");
var replace_text = replace_text.replace(/Total Knee Arthroplasty/gi,"TKA");
var replace_text = replace_text.replace(/Lumbar Puncture/gi,"LP");
var replace_text = replace_text.replace(/postoperative /gi,"post-op");
var replace_text = replace_text.replace(/preoperative /gi,"pre-op");
var replace_text = replace_text.replace(/to rule out/gi,"to r/o");
var replace_text = replace_text.replace(/above-knee amputation/gi,"AKA");
var replace_text = replace_text.replace(/below-knee amputation/gi,"BKA");
var replace_text = replace_text.replace(/above knee amputation/gi,"AKA");
var replace_text = replace_text.replace(/below knee amputation/gi,"BKA");
var replace_text = replace_text.replace(/carotid endarterectomy/gi,"CEA");
var replace_text = replace_text.replace(/right carotid endarterectomy/gi,"Rt. CEA");
var replace_text = replace_text.replace(/left carotid endarterectomy/gi,"Lft. CEA");
var replace_text = replace_text.replace(/DVT prophylaxis/gi,"DVT ppx");
var replace_text = replace_text.replace(/GI prophylaxis/gi,"GI ppx");
var replace_text = replace_text.replace(/physical therapy/gi,"PT");
var replace_text = replace_text.replace(/occupational therapy/gi,"OT");
var replace_text = replace_text.replace(/hyperbaric oxygen/gi,"HBO");
var replace_text = replace_text.replace(/removal of stent/gi,"stent removal");
var replace_text = replace_text.replace(/insertion of stent/gi,"stent insertion");
var replace_text = replace_text.replace(/placement of stent/gi,"stent placement");
var replace_text = replace_text.replace(/surgical intervention/gi,"surgery");

var replace_text = replace_text.replace(/has had her appendix removed/gi,"is s/p appy.");
var replace_text = replace_text.replace(/has had his appendix removed/gi,"is s/p appy.");

//LABS & RESULTS

var replace_text = replace_text.replace(/initial lab work/gi,"labs");
var replace_text = replace_text.replace(/initial lab assessment/gi,"labs");
var replace_text = replace_text.replace(/initial laboratory assessment/gi,"labs");
var replace_text = replace_text.replace(/lab assessment/gi,"labs");
var replace_text = replace_text.replace(/labs assessment/gi,"labs");
var replace_text = replace_text.replace(/laboratory assessment/gi,"labs");
var replace_text = replace_text.replace(/laboratory tests/gi,"labs");
var replace_text = replace_text.replace(/laboratory evaluation/gi,"labs");
var replace_text = replace_text.replace(/Blood work/gi,"labs");
var replace_text = replace_text.replace(/lab work/gi,"labs");
var replace_text = replace_text.replace(/labwork/gi,"labs");
var replace_text = replace_text.replace(/lab-work/gi,"labs");
var replace_text = replace_text.replace(/lab tests/gi,"labs");
var replace_text = replace_text.replace(/level slightly elevated at/gi,"");
var replace_text = replace_text.replace(/started trending upwards/gi,"trended up");

var replace_text = replace_text.replace(/showed no acute abnormalities/gi,"was normal");
var replace_text = replace_text.replace(/showed no acute findings/gi,"was normal");
var replace_text = replace_text.replace(/showed no acute pathology/gi,"was normal");
var replace_text = replace_text.replace(/didn't show any acute abnormalities/gi,"was normal");
var replace_text = replace_text.replace(/did not show any acute abnormalities/gi,"was normal");
var replace_text = replace_text.replace(/didn't show any acute findings/gi,"was normal");
var replace_text = replace_text.replace(/did not show any acute findings/gi,"was normal");
var replace_text = replace_text.replace(/didn't show any acute pathology/gi,"was normal");
var replace_text = replace_text.replace(/did not show any acute pathology/gi,"was normal");
var replace_text = replace_text.replace(/did not show any acute/gi,"was -ve for");
var replace_text = replace_text.replace(/stable from prior/gi,"unchanged");


var replace_text = replace_text.replace(/showed no evidence of/gi,"was -ve for");
var replace_text = replace_text.replace(/showed no evidence for/gi,"was -ve for");
var replace_text = replace_text.replace(/shows no evidence of/gi,"is -ve for");
var replace_text = replace_text.replace(/shows no evidence for/gi,"is -ve for");
var replace_text = replace_text.replace(/showed findings consistent with/gi,"showed");
var replace_text = replace_text.replace(/showed changes consistent with/gi,"showed");
var replace_text = replace_text.replace(/showed pathology consistent with/gi,"showed");
var replace_text = replace_text.replace(/was consistent with/gi,"showed");
var replace_text = replace_text.replace(/consistent with/gi,"showed");
var replace_text = replace_text.replace(/discussed with/gi,"d/w");

var replace_text = replace_text.replace(/was elevated at/gi,"was ");
var replace_text = replace_text.replace(/was very elevated at/gi,"was ");
var replace_text = replace_text.replace(/was also elevated at/gi,"was ");

var replace_text = replace_text.replace(/Was checked which was positive for/gi,"+ve for");
var replace_text = replace_text.replace(/came back positive for/gi,"was +ve for");
var replace_text = replace_text.replace(/came back negative for/gi,"was -ve for");

var replace_text = replace_text.replace(/ended up growing/gi,"grew");

var replace_text = replace_text.replace(/turned out to be positive for/gi,"was +ve for");
var replace_text = replace_text.replace(/turned out to be negative for/gi,"was -ve for");
var replace_text = replace_text.replace(/came back negative/gi,"was -ve");
var replace_text = replace_text.replace(/came back as negative/gi,"was -ve");
var replace_text = replace_text.replace(/came back positive/gi,"was +ve");
var replace_text = replace_text.replace(/came back as positive/gi,"was +ve");
var replace_text = replace_text.replace(/came back unremarkable/gi,"was normal");
var replace_text = replace_text.replace(/came back as unremarkable/gi,"was normal");

var replace_text = replace_text.replace(/was positive for/gi,"+ve for");
var replace_text = replace_text.replace(/is positive for/gi,"+ve for");
var replace_text = replace_text.replace(/are positive for/gi,"+ve for");
var replace_text = replace_text.replace(/was negative for/gi,"-ve for");
var replace_text = replace_text.replace(/is negative for/gi,"is -ve for");
var replace_text = replace_text.replace(/are negative for/gi,"-ve for");
var replace_text = replace_text.replace(/within normal limits/gi,"normal");
var replace_text = replace_text.replace(/was normal at/gi,"was ");
var replace_text = replace_text.replace(/was low at/gi,"was ");
var replace_text = replace_text.replace(/was very low at/gi,"was ");
var replace_text = replace_text.replace(/was elevated at/gi,"was ");
var replace_text = replace_text.replace(/was extremely elevated at/gi,"was ");
var replace_text = replace_text.replace(/was high at/gi,"was ");
var replace_text = replace_text.replace(/was very high at/gi,"was ");
var replace_text = replace_text.replace(/was normal/gi,"was WNL");
var replace_text = replace_text.replace(/was unremarkable/gi,"was normal");
var replace_text = replace_text.replace(/were unremarkable/gi,"were normal");
var replace_text = replace_text.replace(/is remarkable for/gi,"showed");
var replace_text = replace_text.replace(/was remarkable for/gi,"showed");
var replace_text = replace_text.replace(/were remarkable for/gi,"showed");
var replace_text = replace_text.replace(/revealed/gi,"showed");
var replace_text = replace_text.replace(/reveals/gi,"shows");
var replace_text = replace_text.replace(/resulting in/gi,"causing");

var replace_text = replace_text.replace(/did not show/gi,"didn't show");

var replace_text = replace_text.replace(/was also ordered which showed/gi,"showed");
var replace_text = replace_text.replace(/was also ordered that showed/gi,"showed");
var replace_text = replace_text.replace(/was ordered which showed/gi,"showed");
var replace_text = replace_text.replace(/was ordered that showed/gi,"showed");
var replace_text = replace_text.replace(/was ordered showing/gi,"showed");
var replace_text = replace_text.replace(/was ordered which was/gi,"was");
var replace_text = replace_text.replace(/was ordered and was/gi,"was");

var replace_text = replace_text.replace(/was also done which showed/gi,"showed");
var replace_text = replace_text.replace(/was also done that showed/gi,"showed");
var replace_text = replace_text.replace(/was done which showed/gi,"showed");
var replace_text = replace_text.replace(/was done that showed/gi,"showed");
var replace_text = replace_text.replace(/was done showing/gi,"showed");
var replace_text = replace_text.replace(/was done which was/gi,"was");
var replace_text = replace_text.replace(/was done and was/gi,"was");

var replace_text = replace_text.replace(/was also obtained which showed/gi,"showed");
var replace_text = replace_text.replace(/was also obtained that showed/gi,"showed");
var replace_text = replace_text.replace(/was obtained which showed/gi,"showed");
var replace_text = replace_text.replace(/was obtained that showed/gi,"showed");
var replace_text = replace_text.replace(/was obtained showing/gi,"showed");
var replace_text = replace_text.replace(/was obtained which was/gi,"was");
var replace_text = replace_text.replace(/was obtained and was/gi,"was");

var replace_text = replace_text.replace(/was also performed that showed/gi,"showed");
var replace_text = replace_text.replace(/was also performed which showed/gi,"showed");
var replace_text = replace_text.replace(/was performed that showed/gi,"showed");
var replace_text = replace_text.replace(/was performed which showed/gi,"showed");
var replace_text = replace_text.replace(/was performed showing/gi,"showed");
var replace_text = replace_text.replace(/was performed which was/gi,"was");
var replace_text = replace_text.replace(/was performed and was/gi,"was");

var replace_text = replace_text.replace(/was also check which showed/gi,"showed");
var replace_text = replace_text.replace(/was also checked that showed/gi,"showed");
var replace_text = replace_text.replace(/was checked which showed/gi,"showed");
var replace_text = replace_text.replace(/was checked that showed/gi,"showed");
var replace_text = replace_text.replace(/was checked showing/gi,"showed");
var replace_text = replace_text.replace(/was checked which was/gi,"was");
var replace_text = replace_text.replace(/was checked and was/gi,"was");

var replace_text = replace_text.replace(/were also check which showed/gi,"showed");
var replace_text = replace_text.replace(/were also checked that showed/gi,"showed");
var replace_text = replace_text.replace(/were checked which showed/gi,"showed");
var replace_text = replace_text.replace(/were checked that showed/gi,"showed");
var replace_text = replace_text.replace(/were checked showing/gi,"showed");
var replace_text = replace_text.replace(/were checked which were/gi,"were");
var replace_text = replace_text.replace(/were checked and were/gi,"were");


var replace_text = replace_text.replace(/came back positive/gi,"was +ve");
var replace_text = replace_text.replace(/came back negative/gi,"was -ve");
var replace_text = replace_text.replace(/was reported as positive/gi,"was +ve");
var replace_text = replace_text.replace(/was reported as negative/gi,"was -ve");
var replace_text = replace_text.replace(/was reported as/gi,"was");
var replace_text = replace_text.replace(/is reported as/gi,"is");
var replace_text = replace_text.replace(/was also obtained showing/gi,"showed");
var replace_text = replace_text.replace(/was also obtained which showed/gi,"showed");

var replace_text = replace_text.replace(/concerning for/gi,"showed");

var replace_text = replace_text.replace(/complete blood count/gi,"CBC");
var replace_text = replace_text.replace(/complete blood cell count/gi,"CBC");
var replace_text = replace_text.replace(/White blood cell count/gi,"WBC");
var replace_text = replace_text.replace(/White blood cells count/gi,"WBC");
var replace_text = replace_text.replace(/White blood cells/gi,"WBC");
var replace_text = replace_text.replace(/White blood cell/gi,"WBC");
var replace_text = replace_text.replace(/White cell count/gi,"WBC");
var replace_text = replace_text.replace(/White cells count/gi,"WBC");
var replace_text = replace_text.replace(/White count/gi,"WBC");
var replace_text = replace_text.replace(/WBC count/gi,"WBC");
var replace_text = replace_text.replace(/WBC level/gi,"WBC");
var replace_text = replace_text.replace(/WBC was elevated at/gi,"WBC");
var replace_text = replace_text.replace(/WBC was elevated to/gi,"WBC");
var replace_text = replace_text.replace(/WBC was slightly elevated at/gi,"WBC");
var replace_text = replace_text.replace(/WBC was slightly elevated to/gi,"WBC");
var replace_text = replace_text.replace(/WBC was normal at/gi,"WBC");
var replace_text = replace_text.replace(/WBC elevated at/gi,"WBC");
var replace_text = replace_text.replace(/WBC elevated to/gi,"WBC");
var replace_text = replace_text.replace(/WBC slightly elevated at/gi,"WBC");
var replace_text = replace_text.replace(/WBC slightly elevated to/gi,"WBC");
var replace_text = replace_text.replace(/WBC normal at/gi,"WBC");
var replace_text = replace_text.replace(/a WBC of/gi,"WBC");
var replace_text = replace_text.replace(/WBC of/gi,"WBC");

var replace_text = replace_text.replace(/platelet count/gi,"PLT");
var replace_text = replace_text.replace(/PLT of/gi,"PLT");

var replace_text = replace_text.replace(/hemoglobin/gi,"Hgb");
var replace_text = replace_text.replace(/Hgb level/gi,"Hgb");
var replace_text = replace_text.replace(/Mean corpuscular volume/gi,"MCV");
var replace_text = replace_text.replace(/electrolyte panel/gi,"BMP");
var replace_text = replace_text.replace(/basic metabolic panel/gi,"BMP");
var replace_text = replace_text.replace(/comprehensive metabolic panel/gi,"CMP");
var replace_text = replace_text.replace(/Liver Enzymes/gi,"LFTs");
var replace_text = replace_text.replace(/Liver function tests/gi,"LFTs");
var replace_text = replace_text.replace(/Liver Panel/gi,"LFTs");
var replace_text = replace_text.replace(/Liver chemistry Panel/gi,"LFTs");
var replace_text = replace_text.replace(/Liver chemistry/gi,"LFTs");
var replace_text = replace_text.replace(/elevated ammonia level/gi,"hyperammonemia");
var replace_text = replace_text.replace(/urine drug screen/gi,"UDS");
var replace_text = replace_text.replace(/sodium/gi,"Na+");
var replace_text = replace_text.replace(/potassium/gi,"K+");
var replace_text = replace_text.replace(/carbondioxide/gi,"CO2");
var replace_text = replace_text.replace(/carbon-dioxide/gi,"CO2");
var replace_text = replace_text.replace(/carbon dioxide/gi,"CO2");
var replace_text = replace_text.replace(/blood urea nitrogen/gi,"BUN");
var replace_text = replace_text.replace(/phosphorous/gi,"Phos.");
var replace_text = replace_text.replace(/magnesium/gi,"Mag.");
var replace_text = replace_text.replace(/alkaline phosphatase/gi,"ALK");
var replace_text = replace_text.replace(/total bilirubin/gi,"T.Bili");
var replace_text = replace_text.replace(/gram-positive/gi,"Gm +ve");
var replace_text = replace_text.replace(/gram positive/gi,"Gm +ve");
var replace_text = replace_text.replace(/gram-negative/gi,"Gm -ve");
var replace_text = replace_text.replace(/gram negative/gi,"Gm -ve");
var replace_text = replace_text.replace(/troponin/gi,"Trop.");
var replace_text = replace_text.replace(/blood glucose/gi,"Glucose");
var replace_text = replace_text.replace(/serum glucose/gi,"Glucose");
var replace_text = replace_text.replace(/blood cultures/gi,"Bld. Cultures");
var replace_text = replace_text.replace(/urine drug screen/gi,"UDS");
var replace_text = replace_text.replace(/Urinalysis/gi,"UA");
var replace_text = replace_text.replace(/urine analysis/gi,"UA");
var replace_text = replace_text.replace(/cerebrospinal fluid/gi,"CSF");
var replace_text = replace_text.replace(/arterial blood gases/gi,"ABGs");
var replace_text = replace_text.replace(/arterial blood gas/gi,"ABG");
var replace_text = replace_text.replace(/venous blood gases/gi,"VBGs");
var replace_text = replace_text.replace(/venous blood gas/gi,"VBG");
var replace_text = replace_text.replace(/Thyroid stimulating hormone/gi,"TSH");
var replace_text = replace_text.replace(/Thyroid-stimulating hormone/gi,"TSH");
var replace_text = replace_text.replace(/Erythrocyte sedimentation rate/gi,"ESR");
var replace_text = replace_text.replace(/C-reactive protein/gi,"CRP");
var replace_text = replace_text.replace(/ C reactive protein/gi,"CRP");
var replace_text = replace_text.replace(/Anti-Nuclear Antibody/gi,"ANA");
var replace_text = replace_text.replace(/AntiNuclear Antibody/gi,"ANA");
var replace_text = replace_text.replace(/Anti Nuclear Antibody/gi,"ANA");
var replace_text = replace_text.replace(/Serum B12/gi,"B12");
var replace_text = replace_text.replace(/Serum-B12/gi,"B12");

var replace_text = replace_text.replace(/baseline creatinine is at around/gi,"baseline Creatinine ~");
var replace_text = replace_text.replace(/baseline creatinine is around/gi,"baseline Creatinine ~");
var replace_text = replace_text.replace(/baseline creatinine around/gi,"baseline Creatinine ~");
var replace_text = replace_text.replace(/baseline around/gi,"baseline ~");
var replace_text = replace_text.replace(/baseline is around/gi,"baseline ~");
var replace_text = replace_text.replace(/baseline around/gi,"baseline ~");

var replace_text = replace_text.replace(/emphysematous changes/gi,"Emphysema");
var replace_text = replace_text.replace(/changes of emphysema/gi,"Emphysema");
var replace_text = replace_text.replace(/airspace consolidation/gi,"consolidation");

var replace_text = replace_text.replace(/too numerous to count/gi,"packed");


//MEDICATIONS

var replace_text = replace_text.replace(/was given a dose of/gi,"was given");
var replace_text = replace_text.replace(/medications/gi,"meds");
var replace_text = replace_text.replace(/on a regimen of/gi,"on");
var replace_text = replace_text.replace(/with a regimen of/gi,"with");
var replace_text = replace_text.replace(/immunosuppressive medications/gi,"Immunesuppresive Meds");
var replace_text = replace_text.replace(/polysubstance/gi,"Polydrug");
var replace_text = replace_text.replace(/Calcium channel blockers/gi,"CCBs");
var replace_text = replace_text.replace(/Calcium channel blocker/gi,"CCB");
var replace_text = replace_text.replace(/hydrochlorthiazide/gi,"HCTZ");
var replace_text = replace_text.replace(/hydrochlorothiazide/gi,"HCTZ");
var replace_text = replace_text.replace(/methotrexate/gi,"MTX");
var replace_text = replace_text.replace(/nitroglycerin/gi,"NTG");
var replace_text = replace_text.replace(/alteplase/gi,"tPA");
var replace_text = replace_text.replace(/Chemotherapy/gi,"ChemoRx");
var replace_text = replace_text.replace(/Antihypertensive/gi,"Anti-HTN");
var replace_text = replace_text.replace(/Antihypertensives/gi,"Anti-HTN Meds");
var replace_text = replace_text.replace(/Anti-anxiety meds/gi,"anxiolytics");
var replace_text = replace_text.replace(/Anti-anxiety medication/gi,"anxiolytic");
var replace_text = replace_text.replace(/Anti-anxiety medications/gi,"anxiolytics");
var replace_text = replace_text.replace(/Anti-anxiety drugs/gi,"anxiolytics");
var replace_text = replace_text.replace(/Anti-anxiety medicine/gi,"anxiolytic");
var replace_text = replace_text.replace(/Anti-anxiety medicines/gi,"anxiolytics");
var replace_text = replace_text.replace(/antibiotics/gi,"AntiBx");
var replace_text = replace_text.replace(/vancomycin/gi,"Vanco.");
var replace_text = replace_text.replace(/cefepime/gi,"Cefepime");
var replace_text = replace_text.replace(/ceftriaxone/gi,"Ceftriaxone");
var replace_text = replace_text.replace(/rocephin/gi,"Rocephin");
var replace_text = replace_text.replace(/piperacillin–tazobactam/gi,"Zosyn");

var replace_text = replace_text.replace(/nonsteroidal anti-inflammatory drugs/gi,"NSAIDs");
var replace_text = replace_text.replace(/nonsteroidal antiinflammatory drugs/gi,"NSAIDs");
var replace_text = replace_text.replace(/nonsteroidal anti inflammatory drugs/gi,"NSAIDs");

var replace_text = replace_text.replace(/sliding scale insulin/gi,"S/S Insulin");
var replace_text = replace_text.replace(/sliding-scale insulin/gi,"S/S Insulin");

var replace_text = replace_text.replace(/intravenous/gi,"IV");
var replace_text = replace_text.replace(/intravenously/gi,"IV");
var replace_text = replace_text.replace(/normal saline/gi,"NS");
var replace_text = replace_text.replace(/Ringers Lactate/gi,"LR");
var replace_text = replace_text.replace(/pain control/gi,"analgesia");
var replace_text = replace_text.replace(/Aspirin/gi,"ASA");
var replace_text = replace_text.replace(/twice a day/gi,"BID");
var replace_text = replace_text.replace(/twice daily/gi,"BID");
var replace_text = replace_text.replace(/three times a day/gi,"TID");
var replace_text = replace_text.replace(/four times a day/gi,"QID");
var replace_text = replace_text.replace(/once a month/gi,"monthly");
var replace_text = replace_text.replace(/once a week/gi,"weekly");
var replace_text = replace_text.replace(/once a year/gi,"annually");
var replace_text = replace_text.replace(/once per year/gi,"annually");
var replace_text = replace_text.replace(/once per month/gi,"monthly");
var replace_text = replace_text.replace(/once per week/gi,"weekly");
var replace_text = replace_text.replace(/every 12 hours/gi,"q12h");
var replace_text = replace_text.replace(/every 8 hours/gi,"q8h");
var replace_text = replace_text.replace(/every 6 hours/gi,"q6h");
var replace_text = replace_text.replace(/every 4 hours/gi,"q4h");
var replace_text = replace_text.replace(/every 2 hours/gi,"q2h");
var replace_text = replace_text.replace(/every hour/gi,"q1h");

var replace_text = replace_text.replace(/packed red blood cells/gi,"PRBC");
var replace_text = replace_text.replace(/packed RBCs/gi,"PRBC");
var replace_text = replace_text.replace(/fresh frozen plasma/gi,"FFP");

var replace_text = replace_text.replace(/throughout the day/gi,"all day");

var replace_text = replace_text.replace(/ water /gi," H2O ");
var replace_text = replace_text.replace(/alcohol/gi,"ETOH");
var replace_text = replace_text.replace(/ferrous sulphate/gi,"FeSO4");
var replace_text = replace_text.replace(/bicarbonate/gi,"bicarb");
var replace_text = replace_text.replace(/potassium chloride/gi,"KCL");
var replace_text = replace_text.replace(/sodiumm chloride/gi,"NaCL");
var replace_text = replace_text.replace(/magnesium sulphate/gi,"MgSO4");
var replace_text = replace_text.replace(/magnesium sulfate/gi,"MgSO4");
var replace_text = replace_text.replace(/milk of magnesium/gi,"MOM");
var replace_text = replace_text.replace(/milk of magnesia/gi,"MOM");
var replace_text = replace_text.replace(/given orally/gi,"given PO");
var replace_text = replace_text.replace(/taken orally/gi,"taken PO");
var replace_text = replace_text.replace(/subcutaneous/gi,"SQ");
var replace_text = replace_text.replace(/subcutaneously/gi,"Subcut");
var replace_text = replace_text.replace(/intramuscular/gi,"IM");
var replace_text = replace_text.replace(/intramuscularly/gi,"IM");

var replace_text = replace_text.replace(/over the counter/gi,"OTC");
var replace_text = replace_text.replace(/over-the-counter/gi,"OTC");

var replace_text = replace_text.replace(/was put on hold/gi,"was held");
var replace_text = replace_text.replace(/were put on hold/gi,"were held");


//LATERALITY

var replace_text = replace_text.replace(/right flank/gi,"Rt.flank");
var replace_text = replace_text.replace(/left flank/gi,"Lt.flank");
var replace_text = replace_text.replace(/right side/gi,"Rt.side");
var replace_text = replace_text.replace(/right sided/gi,"Rt.sided");
var replace_text = replace_text.replace(/right-sided/gi,"Rt.sided");
var replace_text = replace_text.replace(/left side/gi,"Lt. side");
var replace_text = replace_text.replace(/left sided/gi,"Lt. sided");
var replace_text = replace_text.replace(/left sided/gi,"Lt-sided");
var replace_text = replace_text.replace(/left lower lobe/gi,"LLL");
var replace_text = replace_text.replace(/left upper lobe/gi,"LUL");
var replace_text = replace_text.replace(/Right lower lobe/gi,"RLL");
var replace_text = replace_text.replace(/Right upper lobe/gi,"RUL");
var replace_text = replace_text.replace(/left lower lung/gi,"LLL");
var replace_text = replace_text.replace(/left upper lung/gi,"LUL");
var replace_text = replace_text.replace(/Right lower lung/gi,"RLL");
var replace_text = replace_text.replace(/Right upper lung/gi,"RUL");

var replace_text = replace_text.replace(/left lower quadrant/gi,"LLQ");
var replace_text = replace_text.replace(/right lower quadrant/gi,"RLQ");
var replace_text = replace_text.replace(/left upper quadrant/gi,"LUQ");
var replace_text = replace_text.replace(/right upper quadrant/gi,"RUQ");
var replace_text = replace_text.replace(/left greater than right/gi,"L > R");
var replace_text = replace_text.replace(/right greater than left/gi,"R > L");
var replace_text = replace_text.replace(/bilateral/gi,"Bil.");
var replace_text = replace_text.replace(/right femoral/gi,"Rt. Fem.");
var replace_text = replace_text.replace(/left femoral/gi,"Lft. Fem.");
var replace_text = replace_text.replace(/right hip/gi,"Rt. Hip");
var replace_text = replace_text.replace(/left hip/gi,"Lt. Hip.");
var replace_text = replace_text.replace(/Right upper and lower extremity/gi,"RUE+RLE");
var replace_text = replace_text.replace(/Left upper and lower extremity/gi,"LUE+LLE");
var replace_text = replace_text.replace(/right upper extremity/gi,"RUE");
var replace_text = replace_text.replace(/left upper extremity/gi,"LUE");
var replace_text = replace_text.replace(/right lower extremity/gi,"RLE");
var replace_text = replace_text.replace(/left lower extremity/gi,"LLE");

var replace_text = replace_text.replace(/right total knee replacement/gi,"Rt. TKA");
var replace_text = replace_text.replace(/right knee replacement/gi,"Rt. TKA");
var replace_text = replace_text.replace(/left total knee replacement/gi,"Lft. TKA");
var replace_text = replace_text.replace(/left knee replacement/gi,"Lft. TKA");
var replace_text = replace_text.replace(/right knee/gi,"Rt. knee");
var replace_text = replace_text.replace(/left knee/gi,"Lft. knee");

var replace_text = replace_text.replace(/right greater than left/gi,"R > L");
var replace_text = replace_text.replace(/left greater than right/gi,"L > R");

//PATIENT

var replace_text = replace_text.replace(/year old caucasian female/gi,"/y/o/White/F");
var replace_text = replace_text.replace(/year old caucasian lady/gi,"/y/o/White/F");
var replace_text = replace_text.replace(/year old caucasian woman/gi,"/y/o/White/F");
var replace_text = replace_text.replace(/year old caucasian gentleman/gi,"/y/o/White/M");
var replace_text = replace_text.replace(/year old caucasian man/gi,"/y/o/White/M");
var replace_text = replace_text.replace(/year old caucasian male/gi,"/y/o/White/M");

var replace_text = replace_text.replace(/year old while female/gi,"/y/o/White/F");
var replace_text = replace_text.replace(/year old white lady/gi,"/y/o/White/F");
var replace_text = replace_text.replace(/year old white woman/gi,"/y/o/White/F");
var replace_text = replace_text.replace(/year old white gentleman/gi,"/y/o/White/M");
var replace_text = replace_text.replace(/year old white man/gi,"/y/o/White/M");
var replace_text = replace_text.replace(/year old wite male/gi,"/y/o/White/M");

var replace_text = replace_text.replace(/year old african-american female/gi,"/y/o/Black/F");
var replace_text = replace_text.replace(/year old african-american lady/gi,"/y/o/Black/F");
var replace_text = replace_text.replace(/year old african-american woman/gi,"/y/o/Black/F");
var replace_text = replace_text.replace(/year old african-american gentleman/gi,"/y/o/Black/M");
var replace_text = replace_text.replace(/year old african-american man/gi,"/y/o/Black/M");
var replace_text = replace_text.replace(/year old african-american male/gi,"/y/o/Black/M");

var replace_text = replace_text.replace(/year old african-american female/gi,"/y/o/Black/F");
var replace_text = replace_text.replace(/year old african-american lady/gi,"/y/o/Black/F");
var replace_text = replace_text.replace(/year old african-american woman/gi,"/y/o/Black/F");
var replace_text = replace_text.replace(/year old african-american gentleman/gi,"/y/o/Black/M");
var replace_text = replace_text.replace(/year old african-american man/gi,"/y/o/Black/M");
var replace_text = replace_text.replace(/year old african-american male/gi,"/y/o/Black/M");

var replace_text = replace_text.replace(/year old asian female/gi,"/y/o/Asian/F");
var replace_text = replace_text.replace(/year old asian lady/gi,"/y/o/Asian/F");
var replace_text = replace_text.replace(/year old asian woman/gi,"/y/o/Asian/F");
var replace_text = replace_text.replace(/year old asian gentleman/gi,"/y/o/Asian/M");
var replace_text = replace_text.replace(/year old asian man/gi,"/y/o/Asian/M");
var replace_text = replace_text.replace(/year old asian male/gi,"/y/o/Asian/M");

var replace_text = replace_text.replace(/year old native american female/gi,"/y/o/Native/F");
var replace_text = replace_text.replace(/year old native american lady/gi,"/y/o/Native/F");
var replace_text = replace_text.replace(/year old native american woman/gi,"/y/o/Native/F");
var replace_text = replace_text.replace(/year old native american gentleman/gi,"/y/o/Native/M");
var replace_text = replace_text.replace(/year old native american man/gi,"/y/o/Native/M");
var replace_text = replace_text.replace(/year old native american male/gi,"/y/o/Native/M");

var replace_text = replace_text.replace(/year old native-american female/gi,"/y/o/Native/F");
var replace_text = replace_text.replace(/year old native-american lady/gi,"/y/o/Native/F");
var replace_text = replace_text.replace(/year old native-american woman/gi,"/y/o/Native/F");
var replace_text = replace_text.replace(/year old native-american gentleman/gi,"/y/o/Native/M");
var replace_text = replace_text.replace(/year old native-american man/gi,"/y/o/Native/M");
var replace_text = replace_text.replace(/year old native-american male/gi,"/y/o/Native/M");

var replace_text = replace_text.replace(/ year old male/gi,"/y/o/M");
var replace_text = replace_text.replace(/ years old male/gi,"/y/o/M");
var replace_text = replace_text.replace(/-year-old-male/gi,"/y/o/M");
var replace_text = replace_text.replace(/year-old-male/gi,"/y/o/M");
var replace_text = replace_text.replace(/-year-old male/gi,"/y/o/M");
var replace_text = replace_text.replace(/ yr old male/gi,"/y/o/M");
var replace_text = replace_text.replace(/ yo male/gi,"/y/o/M");
var replace_text = replace_text.replace(/ year old man/gi,"/y/o/M");
var replace_text = replace_text.replace(/ years old man/gi,"/y/o/M");
var replace_text = replace_text.replace(/-year-old man/gi,"/y/o/M");
var replace_text = replace_text.replace(/ yo man/gi,"/y/o/M");
var replace_text = replace_text.replace(/ year old gentleman/gi,"/y/o/M");
var replace_text = replace_text.replace(/-year-old gentleman/gi,"/y/o/M");
var replace_text = replace_text.replace(/ year-old-gentleman/gi,"/y/o/M");
var replace_text = replace_text.replace(/ yo gentleman/gi,"/y/o/M");
var replace_text = replace_text.replace(/ years old gentleman/gi,"/y/o/M");

var replace_text = replace_text.replace(/-year-old female/gi,"/y/o/F");
var replace_text = replace_text.replace(/-year-old-female/gi,"/y/o/F");
var replace_text = replace_text.replace(/ year old female/gi,"/y/o/F");
var replace_text = replace_text.replace(/ years old female/gi,"/y/o/F");
var replace_text = replace_text.replace(/ yr old female/gi,"/y/o/F");
var replace_text = replace_text.replace(/ yo female/gi,"/y/o/F");
var replace_text = replace_text.replace(/ year old lady/gi,"/y/o/F");
var replace_text = replace_text.replace(/-year-old lady/gi,"/y/o/F");
var replace_text = replace_text.replace(/ yr old lady/gi,"/y/o/F");
var replace_text = replace_text.replace(/ yo lady/gi,"/y/o/F");
var replace_text = replace_text.replace(/ year old woman/gi,"/y/o/F");
var replace_text = replace_text.replace(/ year-old-woman/gi,"/y/o/F");
var replace_text = replace_text.replace(/ yr old woman/gi,"/y/o/F");
var replace_text = replace_text.replace(/-year-old-woman/gi,"/y/o/F");
var replace_text = replace_text.replace(/-year-old woman/gi,"/y/o/F");
var replace_text = replace_text.replace(/ yo woman/gi,"/y/o/F");

var replace_text = replace_text.replace(/ year old/gi,"/y/o");
var replace_text = replace_text.replace(/ year-old/gi,"/y/o");
var replace_text = replace_text.replace(/-year-old/gi,"/y/o");

var replace_text = replace_text.replace(/quit smoking several years ago/gi,"is an ex-smoker");
var replace_text = replace_text.replace(/quit smoking many years ago/gi,"is an ex-smoker");
var replace_text = replace_text.replace(/quit smoking years ago/gi,"is an ex-smoker");
var replace_text = replace_text.replace(/former smoker/gi,"ex-smoker");
var replace_text = replace_text.replace(/former alcoholic/gi,"ex-alcoholic");

var replace_text = replace_text.replace(/is currently a /gi,"is a ");

var replace_text = replace_text.replace(/with a past medical history significant for/gi,"w/PMH of");
var replace_text = replace_text.replace(/with past medical history significant for/gi,"w/PMH of");
var replace_text = replace_text.replace(/with a past medical history of/gi,"w/PMH of");
var replace_text = replace_text.replace(/with past medical history of/gi,"w/PMH of");
var replace_text = replace_text.replace(/with past medical history/gi,"w/PMH of");
var replace_text = replace_text.replace(/past medical history/gi,"PMH");
var replace_text = replace_text.replace(/with medical history of/gi,"w/PMH of");
var replace_text = replace_text.replace(/with medical history to include/gi,"w/PMH of");
var replace_text = replace_text.replace(/PMH that includes/gi,"PMH of");
var replace_text = replace_text.replace(/PMH to include/gi,"PMH of");
var replace_text = replace_text.replace(/PMH relevant for/gi,"PMH of");
var replace_text = replace_text.replace(/Significant PMH includes/gi,"PMH of");
var replace_text = replace_text.replace(/Significant PMH of/gi,"PMH of");
var replace_text = replace_text.replace(/PMH significant for/gi,"PMH of");
var replace_text = replace_text.replace(/Relevant PMH of/gi,"PMH of");
var replace_text = replace_text.replace(/Relevant PMH includes/gi,"PMH of");

var replace_text = replace_text.replace(/who was admitted with/gi,"admitted with");


var replace_text = replace_text.replace(/previous history of/gi,"h/o");
var replace_text = replace_text.replace(/history of/gi,"h/o");
var replace_text = replace_text.replace(/ruled out/gi,"r/o");
var replace_text = replace_text.replace(/rule out/gi,"r/o");
var replace_text = replace_text.replace(/ruling out/gi,"r/o");
var replace_text = replace_text.replace(/status post/gi,"s/p");
var replace_text = replace_text.replace(/power of attorney/gi,"POA");
var replace_text = replace_text.replace(/Do Not Resuscitate/gi,"DNR");

var replace_text = replace_text.replace(/activities of daily living/gi,"ADLs");

//ADMIT - TRANSFER - DISCHARGE


var replace_text = replace_text.replace(/Emergency Department/gi,"ER");
var replace_text = replace_text.replace(/Emergency Room/gi,"ER");
var replace_text = replace_text.replace(/Emergency Dept./gi,"ER");
var replace_text = replace_text.replace(/Emergency Dept/gi,"ER");


var replace_text = replace_text.replace(/On arrival to ER/gi,"In the ER");
var replace_text = replace_text.replace(/On arrival to the ER/gi,"In the ER");
var replace_text = replace_text.replace(/Upon arrival to ER/gi,"In the ER");
var replace_text = replace_text.replace(/Upon arrival to the ER/gi,"In the ER");
var replace_text = replace_text.replace(/On presentation to ER/gi,"In the ER");
var replace_text = replace_text.replace(/On presentation to the ER/gi,"In the ER");
var replace_text = replace_text.replace(/Upon presentation to ER/gi,"In the ER");
var replace_text = replace_text.replace(/Upon presentation to the ER/gi,"In the ER");

var replace_text = replace_text.replace(/On arrival to ED/gi,"In the ED");
var replace_text = replace_text.replace(/On arrival to the ED/gi,"In the ED");
var replace_text = replace_text.replace(/Upon arrival to ED/gi,"In the ED");
var replace_text = replace_text.replace(/Upon arrival to the ED/gi,"In the ED");
var replace_text = replace_text.replace(/On presentation to ED/gi,"In the ED");
var replace_text = replace_text.replace(/On presentation to the ED/gi,"In the ED");
var replace_text = replace_text.replace(/Upon presentation to ED/gi,"In the ED");
var replace_text = replace_text.replace(/Upon presentation to the ED/gi,"In the ED");

var replace_text = replace_text.replace(/Upon presentation to /gi,"In the");
var replace_text = replace_text.replace(/Upon presentation to the/gi,"In the");



var replace_text = replace_text.replace(/presented to the ER/gi,"was seen in ER");
var replace_text = replace_text.replace(/presented to the ED/gi,"was seen in ED");

var replace_text = replace_text.replace(/presented to his PCP/gi,"seen by PCP");
var replace_text = replace_text.replace(/presented to her PCP/gi,"seen by PCP");
var replace_text = replace_text.replace(/presented to the clinic/gi,"seen in clinic");
var replace_text = replace_text.replace(/presented to his/gi,"seen by");
var replace_text = replace_text.replace(/presented to her/gi,"seen by");

var replace_text = replace_text.replace(/was brought to the local/gi,"was seen in local");
var replace_text = replace_text.replace(/was brought to a local/gi,"was seen in local");

var replace_text = replace_text.replace(/initial evaluation in the ER showed/gi,"In the ER, ");
var replace_text = replace_text.replace(/initial evaluation in the ED showed/gi,"In the ED, ");

var replace_text = replace_text.replace(/upon initial evaluation/gi,"");

var replace_text = replace_text.replace(/for further evaluation and management of /gi,"for");
var replace_text = replace_text.replace(/for further evaluation and treatment of /gi,"for");
var replace_text = replace_text.replace(/for further management and evaluation of /gi,"for ");
var replace_text = replace_text.replace(/for further evaluation and treatment of /gi,"for ");

var replace_text = replace_text.replace(/for further evaluation and management./gi,".");
var replace_text = replace_text.replace(/for further evaluation and treatment./gi,".");
var replace_text = replace_text.replace(/for further management and evaluation./gi,".");
var replace_text = replace_text.replace(/for further evaluation and treatment./gi,".");



var replace_text = replace_text.replace(/for further evaluation of/gi,"for");
var replace_text = replace_text.replace(/for further evaluation/gi,"");
var replace_text = replace_text.replace(/for evaluation of/gi,"for");

var replace_text = replace_text.replace(/with concerns for/gi,"for");
var replace_text = replace_text.replace(/with concerns of/gi,"for");
var replace_text = replace_text.replace(/for concerns of/gi,"for");


var replace_text = replace_text.replace(/nursing home/gi,"NH");
var replace_text = replace_text.replace(/assisted living/gi,"Asst-Lvng");
var replace_text = replace_text.replace(/skilled nursing facility/gi,"SNF");
var replace_text = replace_text.replace(/nursing facility/gi,"SNF");
var replace_text = replace_text.replace(/ambulance/gi,"ambulance");

var replace_text = replace_text.replace(/appointment/gi,"appt.");
var replace_text = replace_text.replace(/outpatient clinic/gi,"clinic");

var replace_text = replace_text.replace(/Intensive Care Unit/gi,"ICU");
var replace_text = replace_text.replace(/neuro critical care unit/gi,"NCCU");
var replace_text = replace_text.replace(/neuro critical care/gi,"NCCU");
var replace_text = replace_text.replace(/do not resuscitate/gi,"DNR");
var replace_text = replace_text.replace(/do not intubate/gi,"DNI");
var replace_text = replace_text.replace(/brought in by EMS/gi,"BIBEMS");

var replace_text = replace_text.replace(/who was admitted with/gi,"admitted for");

var replace_text = replace_text.replace(/left against medical advice/gi,"left AMA");
var replace_text = replace_text.replace(/discharged against medical advice/gi,"left AMA");




//SPECIALTIES

var replace_text = replace_text.replace(/Orthopedic consultation/gi,"Ortho Consult");
var replace_text = replace_text.replace(/Orthopedic Surgery/gi,"Ortho.Surg.");
var replace_text = replace_text.replace(/General Surgery/gi,"G.Surg.");
var replace_text = replace_text.replace(/Medical Management/gi,"Med. Mgmt.");
var replace_text = replace_text.replace(/family doctor/gi,"PCP");
var replace_text = replace_text.replace(/family physician/gi,"PCP");
var replace_text = replace_text.replace(/Primary Care Provider/gi,"PCP");
var replace_text = replace_text.replace(/Primary Care Physician/gi,"PCP");
var replace_text = replace_text.replace(/Primary Care doctor/gi,"PCP");
var replace_text = replace_text.replace(/Primary Care doc/gi,"PCP");
var replace_text = replace_text.replace(/chemical dependency consult/gi,"CD consult");
var replace_text = replace_text.replace(/gastroenterology team/gi,"GI team");


//MEASUREMENTS

var replace_text = replace_text.replace(/low blood pressure/gi,"hypotension");
var replace_text = replace_text.replace(/systolic blood pressure/gi,"SBP");
var replace_text = replace_text.replace(/diastolic blood pressure/gi,"DBP");
var replace_text = replace_text.replace(/systolic BP/gi,"SBP");
var replace_text = replace_text.replace(/diastolic BP/gi,"DBP")
var replace_text = replace_text.replace(/blood pressure/gi,"BP");
var replace_text = replace_text.replace(/BP of/gi,"BP");
var replace_text = replace_text.replace(/heart rate/gi,"HR");
var replace_text = replace_text.replace(/pulse rate/gi,"HR");
var replace_text = replace_text.replace(/pulse/gi,"HR");
var replace_text = replace_text.replace(/temperature elevated at/gi,"fever of");
var replace_text = replace_text.replace(/temperature elevated upto/gi,"fever upto");
var replace_text = replace_text.replace(/elevated temperature/gi,"fever");
var replace_text = replace_text.replace(/temperature elevation/gi,"fever");

var replace_text = replace_text.replace(/fever with a temperature of/gi,"fever of");
var replace_text = replace_text.replace(/fever with a temperature at/gi,"fever of");
var replace_text = replace_text.replace(/fever with temperature of/gi,"fever of");
var replace_text = replace_text.replace(/fever with temperature at/gi,"fever of");
var replace_text = replace_text.replace(/fever with his temperature of/gi,"fever of");
var replace_text = replace_text.replace(/fever with his temperature at/gi,"fever of");
var replace_text = replace_text.replace(/fever with her temperature of/gi,"fever of");
var replace_text = replace_text.replace(/fever with her temperature at/gi,"fever of");

var replace_text = replace_text.replace(/fever with a temp of/gi,"fever of");
var replace_text = replace_text.replace(/fever with a temp at/gi,"fever of");
var replace_text = replace_text.replace(/fever with temp of/gi,"fever of");
var replace_text = replace_text.replace(/fever with temp at/gi,"fever of");
var replace_text = replace_text.replace(/fever with his temp of/gi,"fever of");
var replace_text = replace_text.replace(/fever with his temp at/gi,"fever of");
var replace_text = replace_text.replace(/fever with her temp of/gi,"fever of");
var replace_text = replace_text.replace(/fever with her temp at/gi,"fever of");

var replace_text = replace_text.replace(/Vitals Upon presentation/gi,"Inital vitals");

var replace_text = replace_text.replace(/respiratory rate/gi,"RR");
var replace_text = replace_text.replace(/RR of/gi,"RR");
var replace_text = replace_text.replace(/vitals were stable/gi,"VSS");
var replace_text = replace_text.replace(/vitals stable/gi,"VSS");
var replace_text = replace_text.replace(/vital signs stable/gi,"VSS");
var replace_text = replace_text.replace(/vital signs were normal/gi,"Vitals normal");
var replace_text = replace_text.replace(/vital signs are normal/gi,"Vitals normal");
var replace_text = replace_text.replace(/vitals were normal/gi,"Vitals normal");
var replace_text = replace_text.replace(/vitals are normal/gi,"Vitals normal");
var replace_text = replace_text.replace(/vital signs/gi,"Vitals");
var replace_text = replace_text.replace(/room air/gi,"RA");
var replace_text = replace_text.replace(/oxygen saturation greater than/gi,"O2 Sats >");
var replace_text = replace_text.replace(/oxygen saturations greater than/gi,"O2 Sats >");
var replace_text = replace_text.replace(/oxygen saturation more than/gi,"O2 Sat >");
var replace_text = replace_text.replace(/oxygen saturations more than/gi,"O2 Sats >");
var replace_text = replace_text.replace(/oxygen saturation above/gi,"O2 Sat >");
var replace_text = replace_text.replace(/oxygen saturations above/gi,"O2 Sats >");
var replace_text = replace_text.replace(/oxygen saturation/gi,"O2 Sat");
var replace_text = replace_text.replace(/oxygen saturations/gi,"O2 Sats");
var replace_text = replace_text.replace(/oxygen/gi,"O2");
var replace_text = replace_text.replace(/sats above/gi,"Sats >");
var replace_text = replace_text.replace(/nasal cannula/gi,"NC");
var replace_text = replace_text.replace(/liter/gi,"L");
var replace_text = replace_text.replace(/liters/gi,"Ls");
var replace_text = replace_text.replace(/confusion/gi,"AMS");

var replace_text = replace_text.replace(/out of 10/gi,"/10");
var replace_text = replace_text.replace(/out of ten/gi,"/10");

//KEEP ENGLISH SIMPLE STUPID :-)

var replace_text = replace_text.replace(/where he was seen after/gi,"for");
var replace_text = replace_text.replace(/where he was seen for/gi,"for");
var replace_text = replace_text.replace(/reported being/gi,"was");
var replace_text = replace_text.replace(/has not/gi,"hasn't");
var replace_text = replace_text.replace(/did show/gi,"showed");
var replace_text = replace_text.replace(/does show/gi,"shows");
var replace_text = replace_text.replace(/did receive/gi,"got");
var replace_text = replace_text.replace(/did report/gi,"had");
var replace_text = replace_text.replace(/does report/gi,"has");
var replace_text = replace_text.replace(/did take/gi,"took");
var replace_text = replace_text.replace(/does take/gi,"takes");
var replace_text = replace_text.replace(/did fall/gi,"fell");
var replace_text = replace_text.replace(/did require/gi,"required");
var replace_text = replace_text.replace(/did have/gi,"had");
var replace_text = replace_text.replace(/does have/gi,"has");
var replace_text = replace_text.replace(/did complete/gi,"completed");
var replace_text = replace_text.replace(/pretty good/gi,"good");
var replace_text = replace_text.replace(/pretty normal/gi,"normal");
var replace_text = replace_text.replace(/rather normal/gi,"normal");
var replace_text = replace_text.replace(/quite nicely/gi,"well");
var replace_text = replace_text.replace(/newly discovered/gi,"new");

var replace_text = replace_text.replace(/at this time/gi,"currently");

var replace_text = replace_text.replace(/while he was/gi,"while");
var replace_text = replace_text.replace(/while she was/gi,"while");
var replace_text = replace_text.replace(/has been given/gi,"was given");
var replace_text = replace_text.replace(/has been treated/gi,"was treated");
var replace_text = replace_text.replace(/has been given/gi,"was given");
var replace_text = replace_text.replace(/has been treated/gi,"was treated");
var replace_text = replace_text.replace(/has been having/gi,"has ongoing");
var replace_text = replace_text.replace(/was administered/gi,"was given");
var replace_text = replace_text.replace(/with concerns for/gi,"with");
var replace_text = replace_text.replace(/due to concerns for/gi,"for");
var replace_text = replace_text.replace(/for concerns of/gi,"of");
var replace_text = replace_text.replace(/secondary to/gi,"due to");
var replace_text = replace_text.replace(/underwent/gi,"had");
var replace_text = replace_text.replace(/requiring/gi,"needing");

var replace_text = replace_text.replace(/follow-up/gi,"f/u");
var replace_text = replace_text.replace(/versus/gi,"v/s");
var replace_text = replace_text.replace(/additionally had/gi,"also had");
var replace_text = replace_text.replace(/additionally has/gi,"also has");
var replace_text = replace_text.replace(/additionally endorses taking/gi,"also took");
var replace_text = replace_text.replace(/additionally endorses giving/gi,"also gave");
var replace_text = replace_text.replace(/additionally endorses having/gi,"also had");
var replace_text = replace_text.replace(/additionally endorses feeling/gi,"also felt");
var replace_text = replace_text.replace(/endorses taking/gi,"takes");
var replace_text = replace_text.replace(/endorses giving/gi,"gave");
var replace_text = replace_text.replace(/endorses having/gi,"had");
var replace_text = replace_text.replace(/endorses feeling/gi,"felt");
var replace_text = replace_text.replace(/endorses/gi,"has");
var replace_text = replace_text.replace(/endorsed/gi,"had");
var replace_text = replace_text.replace(/does not endorse/gi,"denied");

var replace_text = replace_text.replace(/is also notable for/gi,"also shows");
var replace_text = replace_text.replace(/was also notable for/gi,"also showed");
var replace_text = replace_text.replace(/is notable for/gi,"shows");
var replace_text = replace_text.replace(/was notable for/gi,"showed");
var replace_text = replace_text.replace(/notable for/gi,"showed");

var replace_text = replace_text.replace(/demonstrated features of/gi,"showed");
var replace_text = replace_text.replace(/demonstrates features of/gi,"shows");
var replace_text = replace_text.replace(/demonstrated/gi,"showed");
var replace_text = replace_text.replace(/demonstrates/gi,"shows");

var replace_text = replace_text.replace(/is unable to/gi,"can't");
var replace_text = replace_text.replace(/at that time/gi,"then");
var replace_text = replace_text.replace(/approximately/gi,"approx.");

var replace_text = replace_text.replace(/denied any symptoms of/gi,"denied");
var replace_text = replace_text.replace(/denied any/gi,"denied");
var replace_text = replace_text.replace(/no signs of/gi,"no");
var replace_text = replace_text.replace(/without any evidence of/gi,"negative for");
var replace_text = replace_text.replace(/without any signs of/gi,"without");
var replace_text = replace_text.replace(/without any sign of/gi,"without");
var replace_text = replace_text.replace(/with no evidence of/gi,"no");
var replace_text = replace_text.replace(/with no evidence for/gi,"no");

var replace_text = replace_text.replace(/without difficulty/gi,"easily");
var replace_text = replace_text.replace(/poorly controlled/gi,"uncontrolled");
var replace_text = replace_text.replace(/progressively worsening/gi,"worsening");
var replace_text = replace_text.replace(/progressive worsening/gi,"worsening");
var replace_text = replace_text.replace(/significantly worse/gi,"worse");
var replace_text = replace_text.replace(/has been progressively getting worse/gi,"has worsened");
var replace_text = replace_text.replace(/have been progressively getting worse/gi,"have worsened");
var replace_text = replace_text.replace(/became progressively worse/gi,"worsened");
var replace_text = replace_text.replace(/she has been having worsening symptoms/gi,"her symptoms have worsened");
var replace_text = replace_text.replace(/he has been having worsening symptoms/gi,"his symptoms have worsened");
var replace_text = replace_text.replace(/patient has been having worsening symptoms/gi,"Symptoms have worsened");
var replace_text = replace_text.replace(/pt. has been having worsening symptoms/gi,"Symptoms have worsened");

var replace_text = replace_text.replace(/patient continued to be quite hypoxic/gi,"Hypoxia persisted");
var replace_text = replace_text.replace(/patient continued to be quite lethargic/gi,"Lethargy persisted");
var replace_text = replace_text.replace(/patient continued to be quite confused/gi,"confusion persisted");
var replace_text = replace_text.replace(/patient continued to be quite agitated/gi,"agitation persisted");

var replace_text = replace_text.replace(/He continued to be quite hypoxic/gi,"Hypoxia persisted");
var replace_text = replace_text.replace(/He continued to be quite lethargic/gi,"Lethargy persisted");
var replace_text = replace_text.replace(/He continued to be quite confused/gi,"confusion persisted");
var replace_text = replace_text.replace(/He continued to be quite agitated/gi,"agitation persisted");

var replace_text = replace_text.replace(/She continued to be quite hypoxic/gi,"Hypoxia persisted");
var replace_text = replace_text.replace(/She continued to be quite lethargic/gi,"Lethargy persisted");
var replace_text = replace_text.replace(/She continued to be quite confused/gi,"confusion persisted");
var replace_text = replace_text.replace(/She continued to be quite agitated/gi,"agitation persisted");

var replace_text = replace_text.replace(/get worse/gi,"worsen");
var replace_text = replace_text.replace(/got worse/gi,"worsened");

var replace_text = replace_text.replace(/recurrent episodes of/gi,"recurrent");

var replace_text = replace_text.replace(/showed marked improvement of/gi,"showed much improved");
var replace_text = replace_text.replace(/showed significant improvement of/gi,"showed much improved");
var replace_text = replace_text.replace(/significant amount of/gi,"significant");


var replace_text = replace_text.replace(/over the course of/gi,"over");

var replace_text = replace_text.replace(/started becoming/gi,"got");
var replace_text = replace_text.replace(/started to become/gi,"got");

var replace_text = replace_text.replace(/has been dealing with/gi,"has had");

var replace_text = replace_text.replace(/had a Head CT that showed/gi,"Head-CT showed");
var replace_text = replace_text.replace(/had a Brain MRI that showed/gi,"Brain-MRI showed");
var replace_text = replace_text.replace(/had a CXR that showed/gi,"CXR showed");
var replace_text = replace_text.replace(/had a CXR which showed/gi,"CXR showed");
var replace_text = replace_text.replace(/had a EGD that showed/gi,"EGD showed");
var replace_text = replace_text.replace(/had a EGD which showed/gi,"EGD showed");
var replace_text = replace_text.replace(/had a colonoscopy that showed/gi,"colonoscopy showed");
var replace_text = replace_text.replace(/had a colonoscopy which showed/gi,"colonoscopy showed");
var replace_text = replace_text.replace(/had a ECHO that showed/gi,"ECHO showed");
var replace_text = replace_text.replace(/had a ECHO which showed/gi,"ECHO showed");
var replace_text = replace_text.replace(/been experiencing/gi,"been having");
var replace_text = replace_text.replace(/started experiencing/gi,"started having");
var replace_text = replace_text.replace(/began experiencing/gi,"began having");
var replace_text = replace_text.replace(/sustained a fall/gi,"fell");
var replace_text = replace_text.replace(/sustaining a fall/gi,"falling");
var replace_text = replace_text.replace(/suffered a fall/gi,"fell");
var replace_text = replace_text.replace(/suffering a fall/gi,"falling");
var replace_text = replace_text.replace(/fell to the ground/gi,"fell");
var replace_text = replace_text.replace(/suffered a fracture of/gi,"fractured");
var replace_text = replace_text.replace(/sustained a fracture of/gi,"fractured");
var replace_text = replace_text.replace(/suffered a/gi,"had a");
var replace_text = replace_text.replace(/denies hitting her head/gi,"denied head injury");
var replace_text = replace_text.replace(/denies hitting his head/gi,"denied head injury");
var replace_text = replace_text.replace(/denied hitting her head/gi,"denied head injury");
var replace_text = replace_text.replace(/denied hitting his head/gi,"denied head injury");
var replace_text = replace_text.replace(/trauma to her head/gi,"head injury");
var replace_text = replace_text.replace(/trauma to his head/gi,"head injury");

var replace_text = replace_text.replace(/was described as/gi,"was");
var replace_text = replace_text.replace(/is described as/gi,"is");

var replace_text = replace_text.replace(/ and /gi," & ");
var replace_text = replace_text.replace(/as well as/gi," & ");



var replace_text = replace_text.replace(/alleviated/gi,"eased");
var replace_text = replace_text.replace(/mitigated/gi,"eased");
var replace_text = replace_text.replace(/as soon as possible/gi,"ASAP");
var replace_text = replace_text.replace(/due to the fact that/gi,"since");
var replace_text = replace_text.replace(/since that time/gi,"since then");
var replace_text = replace_text.replace(/in light of the fact that/gi,"because");
var replace_text = replace_text.replace(/considering the fact that/gi,"because");
var replace_text = replace_text.replace(/given the fact that/gi,"because");
var replace_text = replace_text.replace(/on a daily basis/gi,"daily");
var replace_text = replace_text.replace(/on a monthly basis/gi,"monthly");
var replace_text = replace_text.replace(/on a weekly basis/gi,"weekly");
var replace_text = replace_text.replace(/on a yearly basis/gi,"annualy");
var replace_text = replace_text.replace(/on a annual basis/gi,"annualy");
var replace_text = replace_text.replace(/unknown period of time/gi,"unknown period");
var replace_text = replace_text.replace(/embolic in nature/gi,"embolic");
var replace_text = replace_text.replace(/was seen with complaints of/gi,"complained of");
var replace_text = replace_text.replace(/was found to be/gi,"was");
var replace_text = replace_text.replace(/was found to have/gi,"had");
var replace_text = replace_text.replace(/with the exception of/gi,"except");
var replace_text = replace_text.replace(/for management of/gi,"for");
var replace_text = replace_text.replace(/for the management of/gi,"for");
var replace_text = replace_text.replace(/showed changes of/gi,"showed");
var replace_text = replace_text.replace(/with findings of/gi,"with");

var replace_text = replace_text.replace(/was in his usual state of health/gi,"was doing well");
var replace_text = replace_text.replace(/was in her usual state of health/gi,"was doing well");
var replace_text = replace_text.replace(/started feeling/gi,"got");
var replace_text = replace_text.replace(/had an episode of/gi,"had");
var replace_text = replace_text.replace(/up until/gi,"until");

var replace_text = replace_text.replace(/was noted to be/gi,"was");

var replace_text = replace_text.replace(/she states that she has had/gi,"She had");
var replace_text = replace_text.replace(/he states that he has had/gi,"He had");

var replace_text = replace_text.replace(/she states that she has/gi,"She has");
var replace_text = replace_text.replace(/he states that he has/gi,"He has");

var replace_text = replace_text.replace(/Patient states that she has/gi,"She has");
var replace_text = replace_text.replace(/Patient states that he has/gi,"He has");

var replace_text = replace_text.replace(/states that she has/gi,"has");
var replace_text = replace_text.replace(/states that he has/gi,"has");

var replace_text = replace_text.replace(/patient states that/gi,"");
var replace_text = replace_text.replace(/she states that/gi,"");
var replace_text = replace_text.replace(/he states that/gi,"");

var replace_text = replace_text.replace(/patient stated that/gi,"");
var replace_text = replace_text.replace(/she stated that/gi,"");
var replace_text = replace_text.replace(/he stated that/gi,"");

var replace_text = replace_text.replace(/patient states/gi,"");
var replace_text = replace_text.replace(/she states/gi,"");
var replace_text = replace_text.replace(/he states/gi,"");

var replace_text = replace_text.replace(/she reports that she has had/gi,"She had");
var replace_text = replace_text.replace(/he reports that he has had/gi,"He had");

var replace_text = replace_text.replace(/she reports that she/gi,"She");
var replace_text = replace_text.replace(/he reports that he/gi,"He");

var replace_text = replace_text.replace(/Patient reports that she/gi,"She");
var replace_text = replace_text.replace(/Patient reports that he has/gi,"He");

var replace_text = replace_text.replace(/Patient reports pain as/gi,"Pain is");
var replace_text = replace_text.replace(/Patient reports pain is/gi,"Pain is");

var replace_text = replace_text.replace(/reports that she has/gi,"has");
var replace_text = replace_text.replace(/reports that he has/gi,"has");

var replace_text = replace_text.replace(/reports having/gi,"has");

var replace_text = replace_text.replace(/As per patient's report/gi," ");
var replace_text = replace_text.replace(/As per patient report/gi," ");
var replace_text = replace_text.replace(/As per patients report/gi," ");

var replace_text = replace_text.replace(/As per the patient she/gi,"she");
var replace_text = replace_text.replace(/As per the patient he/gi,"he");

var replace_text = replace_text.replace(/As per the patient, she/gi,"she");
var replace_text = replace_text.replace(/As per the patient, he/gi,"he");

var replace_text = replace_text.replace(/patient reports that/gi,"");
var replace_text = replace_text.replace(/she reports that/gi,"");
var replace_text = replace_text.replace(/he reports that/gi,"");

var replace_text = replace_text.replace(/patient reported that/gi,"");
var replace_text = replace_text.replace(/she reported that/gi,"");
var replace_text = replace_text.replace(/he reported that/gi,"");

var replace_text = replace_text.replace(/patient reported/gi,"");
var replace_text = replace_text.replace(/she reported/gi,"");
var replace_text = replace_text.replace(/he reported/gi,"");

var replace_text = replace_text.replace(/initially started/gi,"started");
var replace_text = replace_text.replace(/initially began/gi,"began");

var replace_text = replace_text.replace(/had a rather normal/gi,"had a normal");

var replace_text = replace_text.replace(/associated with/gi,"with");

var replace_text = replace_text.replace(/fairly quickly/gi,"rapidly");

var replace_text = replace_text.replace(/a lot better/gi,"better");
var replace_text = replace_text.replace(/unfortunately/gi,"");
var replace_text = replace_text.replace(/ultimately/gi,"");
var replace_text = replace_text.replace(/reportedly/gi,"");
var replace_text = replace_text.replace(/however/gi,"");
var replace_text = replace_text.replace(/apparently/gi,"");
var replace_text = replace_text.replace(/ongoing/gi,"");
var replace_text = replace_text.replace(/whatsoever/gi,"");

var replace_text = replace_text.replace(/what sounds like/gi,"");
var replace_text = replace_text.replace(/what sounded like/gi,"");

var replace_text = replace_text.replace(/it sounded as though/gi,"");
var replace_text = replace_text.replace(/sounded as though/gi,"");

var replace_text = replace_text.replace(/very minimal/gi,"minimal");

var replace_text = replace_text.replace(/every now and then/gi,"often");
var replace_text = replace_text.replace(/now and then/gi,"often");

var replace_text = replace_text.replace(/every now & then/gi,"often");
var replace_text = replace_text.replace(/now & then/gi,"often");

var replace_text = replace_text.replace(/to maintain/gi,"to keep");

var replace_text = replace_text.replace(/somewhat limited by/gi,"limited by");

var replace_text = replace_text.replace(/ one of the /gi,"one");

var replace_text = replace_text.replace(/after having a/gi,"after a");

var replace_text = replace_text.replace(/went away on its own/gi,"self-resolved");
var replace_text = replace_text.replace(/went away on it's own/gi,"self-resolved");

var replace_text = replace_text.replace(/management/gi,"mgmt.");



//NUMERICAL

var replace_text = replace_text.replace(/ first /gi,"1st");
var replace_text = replace_text.replace(/ second /gi,"2nd");
var replace_text = replace_text.replace(/ third /gi,"3rd");
var replace_text = replace_text.replace(/ fourth /gi,"4th");
var replace_text = replace_text.replace(/ fifth /gi,"5th");
var replace_text = replace_text.replace(/ two /gi," 2 ");
var replace_text = replace_text.replace(/ three /gi," 3 ");
var replace_text = replace_text.replace(/ four /gi," 4 ");
var replace_text = replace_text.replace(/ five /gi,"5");
var replace_text = replace_text.replace(/ six /gi," 6 ");
var replace_text = replace_text.replace(/ seven /gi," 7 ");
var replace_text = replace_text.replace(/ eight /gi," 8 ");
var replace_text = replace_text.replace(/ nine /gi," 9 ");


var replace_text = replace_text.replace(/for 1 week/gi,"X 1 wks");
var replace_text = replace_text.replace(/for 2 weeks/gi,"X 2 wks");
var replace_text = replace_text.replace(/for 3 weeks/gi,"X 3 wks");
var replace_text = replace_text.replace(/for 4 weeks/gi,"X 4 wks");

var replace_text = replace_text.replace(/for the past week/gi,"X 1 wk.");
var replace_text = replace_text.replace(/for the past 1 week/gi,"X 1 wk.");
var replace_text = replace_text.replace(/for the past 2 weeks/gi,"X 2 wks");
var replace_text = replace_text.replace(/for the past 3 weeks/gi,"X 3 wks");
var replace_text = replace_text.replace(/for the past 4 weeks/gi,"X 4 wks");

var replace_text = replace_text.replace(/for the past 2/gi,"X 2");
var replace_text = replace_text.replace(/for the past 3/gi,"X 3");
var replace_text = replace_text.replace(/for the past 4/gi,"X 4");
var replace_text = replace_text.replace(/for the past 5/gi,"X 5");
var replace_text = replace_text.replace(/for the past 6/gi,"X 6");
var replace_text = replace_text.replace(/for the past 7/gi,"X 7");
var replace_text = replace_text.replace(/for the past 8/gi,"X 8");
var replace_text = replace_text.replace(/for the past 9/gi,"X 9");

var replace_text = replace_text.replace(/over the past/gi,"X");
var replace_text = replace_text.replace(/over the last/gi,"X");
var replace_text = replace_text.replace(/for the past/gi,"X");

var replace_text = replace_text.replace(/was less than/gi," < ");
var replace_text = replace_text.replace(/was lesser than/gi," < ");
var replace_text = replace_text.replace(/was greater than/gi," > ");
var replace_text = replace_text.replace(/is less than/gi," < ");
var replace_text = replace_text.replace(/is lesser than/gi," < ");
var replace_text = replace_text.replace(/is greater than/gi," > ");


var replace_text = replace_text.replace(/back on/gi,"on");


document.getElementById('GetMedNotes').value = replace_text;

document.getElementById('GetMedNotes').setSelectionRange(end, end);
document.getElementById('GetMedNotes').focus();

}

function copy_text()

{

var copyText = document.getElementById('GetMedNotes');

copyText.select();
document.execCommand("copy");

}

function clear_text()

{
document.getElementById('GetMedNotes').value = " ";
}

