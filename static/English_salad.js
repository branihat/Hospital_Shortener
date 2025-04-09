// Modify the shortify function to accept and return text
function shortify(outputText) {
    let replace_text = outputText;
    
    //PATHOLOGY

    replace_text = replace_text.replace(/differential diagnosis/gi,"DDx");
    replace_text = replace_text.replace(/differential diagnoses/gi,"DDx");
    replace_text = replace_text.replace(/hypertension/gi,"HTN");
    replace_text = replace_text.replace(/essential HTN/gi,"HTN");
    replace_text = replace_text.replace(/st-segment/gi,"ST");
    replace_text = replace_text.replace(/st segment/gi,"ST");
    replace_text = replace_text.replace(/st elevation myocardial infarction/gi,"STEMI");
    replace_text = replace_text.replace(/st-elevation mi/gi,"STEMI");
    replace_text = replace_text.replace(/non st elevation myocardial infarction/gi,"NSTEMI");
    replace_text = replace_text.replace(/non st elevation mi/gi,"NSTEMI");
    replace_text = replace_text.replace(/non-st elevation mi/gi,"NSTEMI");
    replace_text = replace_text.replace(/myocardial infarction/gi,"MI");
    replace_text = replace_text.replace(/st elevation mi/gi,"STEMI");
    replace_text = replace_text.replace(/non-stemi/gi,"NSTEMI");
    replace_text = replace_text.replace(/normal sinus rhythm/gi,"NSR");
    replace_text = replace_text.replace(/right bundle branch block/gi,"RBBB");
    replace_text = replace_text.replace(/left bundle branch block/gi,"LBBB");
    replace_text = replace_text.replace(/ventricular tachycardia/gi,"V-Tach");
    replace_text = replace_text.replace(/congestive heart failure/gi,"CHF");
    replace_text = replace_text.replace(/coronary artery disease/gi,"CAD");
    replace_text = replace_text.replace(/coronary disease/gi,"CAD");
    replace_text = replace_text.replace(/heart failure/gi,"HF");
    replace_text = replace_text.replace(/atrial fibrillation/gi,"A-Fib");
    replace_text = replace_text.replace(/Paroxysmal atrial fibrillation/gi,"Parox-AFib");
    replace_text = replace_text.replace(/rapid ventricular rhythm/gi,"RVR");
    replace_text = replace_text.replace(/left ventricular hypertrophy/gi,"LVH");

    replace_text = replace_text.replace(/peripheral vascular disease/gi,"PVD");
    replace_text = replace_text.replace(/peripheral arterial disease/gi,"PVD");
    replace_text = replace_text.replace(/peripheral vessel disease/gi,"PVD");

    replace_text = replace_text.replace(/hyperlipidemia/gi,"HLP");
    replace_text = replace_text.replace(/hypercholesterolemia/gi,"HLP");
    replace_text = replace_text.replace(/dyslipidemia/gi,"HLP");
    replace_text = replace_text.replace(/Motor vehicle accident/gi,"MVA");

    replace_text = replace_text.replace(/chronic obstructive pulmonary disease/gi,"COPD");
    replace_text = replace_text.replace(/Acute respiratory failure with hypoxia/gi,"Acute hypoxic resp. failure");
    replace_text = replace_text.replace(/obstructive sleep apnea/gi,"OSA");
    replace_text = replace_text.replace(/obesity hypoventilation syndrome/gi,"OHS");
    replace_text = replace_text.replace(/interstitial lung disease/gi,"ILD");
    replace_text = replace_text.replace(/sleep apnea/gi,"OSA");
    replace_text = replace_text.replace(/pneumonia/gi,"PNA");
    replace_text = replace_text.replace(/pulmonary embolus/gi,"PE");
    replace_text = replace_text.replace(/pulmonary embolism/gi,"PE");
    replace_text = replace_text.replace(/pulmonary emboli/gi,"PE");

    replace_text = replace_text.replace(/Lung Cancer/gi,"Lung Ca.");

    replace_text = replace_text.replace(/stroke/gi,"CVA");
    replace_text = replace_text.replace(/cerebrovascular accident/gi,"CVA");
    replace_text = replace_text.replace(/subarachnoid hemorrhage/gi,"SAH");
    replace_text = replace_text.replace(/subdural hematoma/gi,"SDH");
    replace_text = replace_text.replace(/room spinning sensation/gi,"vertigo");
    replace_text = replace_text.replace(/felt like the room was spinning/gi,"had vertigo");
    replace_text = replace_text.replace(/restless leg syndrome/gi,"RLS");

    replace_text = replace_text.replace(/Acute blood loss anemia/gi,"ABL Anemia");

    replace_text = replace_text.replace(/Non-Insulin dependent diabetes mellitus/gi,"NIDDM");
    replace_text = replace_text.replace(/Non Insulin dependent diabetes mellitus/gi,"NIDDM");
    replace_text = replace_text.replace(/Insulin-dependent diabetes mellitus/gi,"IDDM");
    replace_text = replace_text.replace(/Insulin dependent diabetes mellitus/gi,"IDDM");
    replace_text = replace_text.replace(/Type 2 diabetes mellitus/gi,"DMT2");
    replace_text = replace_text.replace(/Type 1 diabetes mellitus/gi,"DMT1");
    replace_text = replace_text.replace(/Type two diabetes/gi,"DMT2");
    replace_text = replace_text.replace(/Type one diabetes/gi,"DMT1");
    replace_text = replace_text.replace(/diabetes type one/gi,"DMT2");
    replace_text = replace_text.replace(/diabetes type two/gi,"DMT1");
    replace_text = replace_text.replace(/Type 1 DM/gi,"DMT1");
    replace_text = replace_text.replace(/Type 2 Diabetes/gi,"DMT2");
    replace_text = replace_text.replace(/Type 1 Diabetes/gi,"DMT1");
    replace_text = replace_text.replace(/Type 2 DM/gi,"DMT2");
    replace_text = replace_text.replace(/Type 1 DM/gi,"DMT1");
    replace_text = replace_text.replace(/Diabetes Type 1/gi,"DMT1");
    replace_text = replace_text.replace(/Diabetes Type 2/gi,"DMT2");
    replace_text = replace_text.replace(/Diabetes Type-1/gi,"DMT1");
    replace_text = replace_text.replace(/Diabetes Type-2/gi,"DMT2");
    replace_text = replace_text.replace(/Diabetes Type1/gi,"DMT1");
    replace_text = replace_text.replace(/Diabetes Type1/gi,"DMT2");

    replace_text = replace_text.replace(/diabetes mellitus type 2/gi,"DM2");
    replace_text = replace_text.replace(/diabetes mellitus type2/gi,"DM2");
    replace_text = replace_text.replace(/diabetes mellitus/gi,"DM");
    replace_text = replace_text.replace(/prediabetes/gi,"pre-DM2");
    replace_text = replace_text.replace(/pre-diabetes/gi,"pre-DM2");

    replace_text = replace_text.replace(/acute kidney injury/gi,"AKI");
    replace_text = replace_text.replace(/acute renal failure/gi,"AKI");
    replace_text = replace_text.replace(/chronic kidney disease/gi,"CKD");
    replace_text = replace_text.replace(/end stage renal disease/gi,"ESRD");
    replace_text = replace_text.replace(/end-stage renal disease/gi,"ESRD");
    replace_text = replace_text.replace(/end stage renal failure/gi,"ESRD");
    replace_text = replace_text.replace(/end-stage renal failure/gi,"ESRD");
    replace_text = replace_text.replace(/end stage kidney disease/gi,"ESRD");
    replace_text = replace_text.replace(/end-stage kidney disease/gi,"ESRD");
    replace_text = replace_text.replace(/end stage kidney failure/gi,"ESRD");
    replace_text = replace_text.replace(/end-stage kidney failure/gi,"ESRD");
    replace_text = replace_text.replace(/acute on chronic kidney failure/gi,"AKI on CKD");
    replace_text = replace_text.replace(/acute on chronic renal failure/gi,"AKI on CKD");
    replace_text = replace_text.replace(/renal cell cancer/gi,"RCC");
    replace_text = replace_text.replace(/renal cell carcinoma/gi,"RCC");
    replace_text = replace_text.replace(/urinary tract infection/gi,"UTI");

    replace_text = replace_text.replace(/end stage liver disease/gi,"ESLD");
    replace_text = replace_text.replace(/end-stage liver disease/gi,"ESLD");
    replace_text = replace_text.replace(/hepatorenal syndrome/gi,"HRS");
    replace_text = replace_text.replace(/hepato-renal syndrome/gi,"HRS");
    replace_text = replace_text.replace(/hepato renal syndrome/gi,"HRS");

    replace_text = replace_text.replace(/Alpha-1 antitrypsin/gi,"AAT");

    replace_text = replace_text.replace(/gastroesophageal reflux disease/gi,"GERD");
    replace_text = replace_text.replace(/gastrointestinal bleed/gi,"GI bleed");
    replace_text = replace_text.replace(/acid reflux disease/gi,"GERD");
    replace_text = replace_text.replace(/acid reflux/gi,"GERD");
    replace_text = replace_text.replace(/peptic ulcer disease/gi,"PUD");
    replace_text = replace_text.replace(/gastric ulcer/gi,"GU");
    replace_text = replace_text.replace(/duodenal ulcer/gi,"DU");
    replace_text = replace_text.replace(/cholelithiasis/gi,"gallstones");
    replace_text = replace_text.replace(/choledocholithiasis/gi,"CBD-stones");
    replace_text = replace_text.replace(/helicobacter pylori/gi,"H.pylori");
    replace_text = replace_text.replace(/C.Difficile/gi,"C.Diff.");
    replace_text = replace_text.replace(/Clostridium Difficile/gi,"C.Diff.");
    replace_text = replace_text.replace(/small bowel obstruction/gi,"SBO");
    replace_text = replace_text.replace(/Colon Cancer/gi,"Colon Ca.");
    replace_text = replace_text.replace(/Colonic Cancer/gi,"Colon Ca.");
    replace_text = replace_text.replace(/Rectal Cancer/gi,"Rectal Ca.");
    replace_text = replace_text.replace(/fatty infiltration of the liver/gi,"Fatty Liver");
    replace_text = replace_text.replace(/degenerative joint disease/gi,"DJD");
    replace_text = replace_text.replace(/rheumatoid arthritis/gi,"RA");
    replace_text = replace_text.replace(/breast Cancer/gi,"Breast Ca.");
    replace_text = replace_text.replace(/alcoholism/gi,"ETOH-ism");
    replace_text = replace_text.replace(/deep vein thrombosis/gi,"DVT");
    replace_text = replace_text.replace(/spontaneous bacterial peritonitis/gi,"SBP");
    replace_text = replace_text.replace(/liver cirrhosis/gi,"cirrhosis");
    replace_text = replace_text.replace(/hepatitis C/gi,"Hep-C");
    replace_text = replace_text.replace(/hepatitis B/gi,"Hep-B");
    replace_text = replace_text.replace(/hepatitis A/gi,"Hep-A");
    replace_text = replace_text.replace(/hepatocellular cancer/gi,"HCC");
    replace_text = replace_text.replace(/hepatocellular carcinoma/gi,"HCC");
    replace_text = replace_text.replace(/abdominal ascites/gi,"ascites");

    replace_text = replace_text.replace(/Squamous Cell carcinoma/gi,"SCC");
    replace_text = replace_text.replace(/Squamous Cell cancer/gi,"SCC");
    replace_text = replace_text.replace(/Squamous Cell Ca/gi,"SCC");
    replace_text = replace_text.replace(/metastatic disease/gi,"Metastasis");
    replace_text = replace_text.replace(/diffuse large B-cell lymphoma/gi,"DLBCL");
    replace_text = replace_text.replace(/Non-small cell lung cancer/gi,"NSCLC");
    replace_text = replace_text.replace(/Non small cell lung cancer/gi,"NSCLC");

    replace_text = replace_text.replace(/metastatic lesions/gi,"metastasis");
    replace_text = replace_text.replace(/metastatic spread to the/gi,"mets to");

    replace_text = replace_text.replace(/tobacco use disorder/gi,"tobacco dependence");

    replace_text = replace_text.replace(/methicillin resistant Staphylococcus aureus/gi,"MRSA");
    replace_text = replace_text.replace(/methicillin-resistant Staphylococcus aureus/gi,"MRSA");
    replace_text = replace_text.replace(/methicillin sensitive Staphylococcus aureus/gi,"MSSA");
    replace_text = replace_text.replace(/methicillin-sensitive Staphylococcus aureus/gi,"MSSA");

    replace_text = replace_text.replace(/benign prostatic hypertrophy/gi,"BPH");
    replace_text = replace_text.replace(/benign prostate hypertrophy/gi,"BPH");
    replace_text = replace_text.replace(/benign prostatic hyperplasia/gi,"BPH");
    replace_text = replace_text.replace(/benign prostate hyperplasia/gi,"BPH");
    replace_text = replace_text.replace(/benign prostate enlargement/gi,"BPH");

        //ANATOMICAL

    replace_text = replace_text.replace(/common bile duct/gi,"CBD");
    replace_text = replace_text.replace(/gallbladder/gi,"GB");
    replace_text = replace_text.replace(/gall bladder/gi,"GB");
    replace_text = replace_text.replace(/lymph nodes/gi,"LNs");
    replace_text = replace_text.replace(/lymph node/gi,"LN");
    replace_text = replace_text.replace(/lymphnode/gi,"LN");
    replace_text = replace_text.replace(/lymphnodes/gi,"LNs");
    replace_text = replace_text.replace(/atrioventricular/gi,"AV");
    replace_text = replace_text.replace(/Abdominal pain localized to the RUQ/gi,"RUQ Abd. pain");

    replace_text = replace_text.replace(/lower extremities/gi,"legs");
    replace_text = replace_text.replace(/upper extremities/gi,"arms");

        //SYMPTOMS

    replace_text = replace_text.replace(/sudden onset of/gi,"acute");
    replace_text = replace_text.replace(/new onset of/gi,"acute");
    replace_text = replace_text.replace(/new onset/gi,"acute");
    replace_text = replace_text.replace(/all of a sudden developed/gi,"had acute");
    replace_text = replace_text.replace(/started noticing/gi,"had");
    replace_text = replace_text.replace(/intermittent outbreaks of/gi,"recurrent");

    replace_text = replace_text.replace(/had no symptoms/gi,"was asymptomatic");
    replace_text = replace_text.replace(/altered mental status/gi,"AMS");
    replace_text = replace_text.replace(/confusion/gi,"AMS");
    replace_text = replace_text.replace(/not acting herself/gi,"confused");
    replace_text = replace_text.replace(/not acting himself/gi,"confused");

    replace_text = replace_text.replace(/feeling under the weather/gi,"feeling sick");
    replace_text = replace_text.replace(/not feeling well/gi,"feeling ill");
    replace_text = replace_text.replace(/generalized fatigue/gi,"fatigue");
    replace_text = replace_text.replace(/tired-looking/gi,"fatigued");

    replace_text = replace_text.replace(/complaint of/gi,"c/o");
    replace_text = replace_text.replace(/complaints of/gi,"c/o");
    replace_text = replace_text.replace(/complains of/gi,"c/o");
    replace_text = replace_text.replace(/complained of/gi,"c/o");
    replace_text = replace_text.replace(/complaining of/gi,"c/o");
    replace_text = replace_text.replace(/short of breath/gi,"SOB");
    replace_text = replace_text.replace(/having difficulty breathing/gi,"dyspneic");
    replace_text = replace_text.replace(/having trouble breathing/gi,"dyspneic");
    replace_text = replace_text.replace(/having trouble catching his breath/gi,"dyspneic");
    replace_text = replace_text.replace(/having trouble catching her breath/gi,"dyspneic");
    replace_text = replace_text.replace(/dyspnea worse with laying flat/gi,"orthopnea");
    replace_text = replace_text.replace(/SOB worse with laying flat/gi,"orthopnea");
    replace_text = replace_text.replace(/shortness of breath/gi,"SOB");
    replace_text = replace_text.replace(/dyspnea on exertion/gi,"exertional SOB");
    replace_text = replace_text.replace(/dyspnea/gi,"SOB");
    replace_text = replace_text.replace(/SOB on exertion/gi,"exertional dyspnea");
    replace_text = replace_text.replace(/increased work of breathing/gi,"labored breathing");
    replace_text = replace_text.replace(/struggling to breathe/gi,"dyspneic");
    replace_text = replace_text.replace(/struggled to breathe/gi,"was dyspneic");

    replace_text = replace_text.replace(/was coughing up blood/gi,"had hemoptysis");
    replace_text = replace_text.replace(/coughing up blood/gi,"hemoptysis");
    replace_text = replace_text.replace(/coughed up blood/gi,"had hemoptysis");
    replace_text = replace_text.replace(/was coughing up blood/gi,"had hemoptysis");
    replace_text = replace_text.replace(/was coughing up any blood/gi,"had hemoptysis");
    replace_text = replace_text.replace(/cough with sputum/gi,"productive cough");
    replace_text = replace_text.replace(/cough with expectoration of sputum/gi,"productive cough");
    replace_text = replace_text.replace(/cough with expectoration of phlegm/gi,"productive cough");
    replace_text = replace_text.replace(/cough with sputum/gi,"productive cough");
    replace_text = replace_text.replace(/cough with phlegm/gi,"productive cough");
    replace_text = replace_text.replace(/cough productive of yellow sputum/gi,"purulent cough");
    replace_text = replace_text.replace(/cough productive of yellow phlegm/gi,"purulent cough");

    replace_text = replace_text.replace(/felt like his heart was racing/gi,"had palpitations");
    replace_text = replace_text.replace(/felt like her heart was racing/gi,"had palpitations");
    replace_text = replace_text.replace(/felt like his heart was pounding/gi,"had palpitations");
    replace_text = replace_text.replace(/felt like her heart was pounding/gi,"had palpitations");
    replace_text = replace_text.replace(/felt like his chest was pounding/gi,"had palpitations");
    replace_text = replace_text.replace(/felt like her chest was pounding/gi,"had palpitations");
    replace_text = replace_text.replace(/a racing heart/gi,"palpitations");

    replace_text = replace_text.replace(/gastrointestinal/gi,"GI");
    replace_text = replace_text.replace(/vomitting/gi,"vomiting");
    replace_text = replace_text.replace(/Nausea or vomiting or diarrhea/gi,"N/V/D");
    replace_text = replace_text.replace(/Nausea, vomiting and diarrhea/gi,"N/V/D");
    replace_text = replace_text.replace(/Nausea, vomiting with diarrhea/gi,"N/V/D");
    replace_text = replace_text.replace(/Nausea, vomiting & diarrhea/gi,"N/V/D");
    replace_text = replace_text.replace(/Nausea, vomiting, diarrhea/gi,"N/V/D");
    replace_text = replace_text.replace(/Nausea, emesis, diarrhea/gi,"N/V/D");
    replace_text = replace_text.replace(/Nausea and emesis with diarrhea/gi,"N/V/D");
    replace_text = replace_text.replace(/Nausea and vomiting with diarrhea/gi,"N/V/D");
    replace_text = replace_text.replace(/Nausea and vomiting/gi,"N/V");
    replace_text = replace_text.replace(/Nausea or vomiting/gi,"N/V");
    replace_text = replace_text.replace(/Nausea, vomiting/gi,"N/V");
    replace_text = replace_text.replace(/Nausea,vomiting/gi,"N/V");
    replace_text = replace_text.replace(/Nausea, and vomiting/gi,"N/V");
    replace_text = replace_text.replace(/Nausea & vomiting/gi,"N/V");
    replace_text = replace_text.replace(/Nausea or emesis/gi,"N/V");
    replace_text = replace_text.replace(/Nausea and emesis/gi,"N/V");
    replace_text = replace_text.replace(/Nausea & emesis/gi,"N/V");
    replace_text = replace_text.replace(/Nausea with vomitting/gi,"N/V");

    replace_text = replace_text.replace(/a lack of appetite/gi,"anorexia");
    replace_text = replace_text.replace(/lack of appetite/gi,"anorexia");
    replace_text = replace_text.replace(/a loss of appetite/gi,"anorexia");
    replace_text = replace_text.replace(/loss of appetite/gi,"anorexia");
    replace_text = replace_text.replace(/a lost appetite/gi,"anorexia");
    replace_text = replace_text.replace(/lost appetite/gi,"anorexia");
    replace_text = replace_text.replace(/a low appetite/gi,"anorexia");
    replace_text = replace_text.replace(/low appetite/gi,"anorexia");
    replace_text = replace_text.replace(/a poor appetite/gi,"anorexia");
    replace_text = replace_text.replace(/poor appetite/gi,"anorexia");
    replace_text = replace_text.replace(/lost all appetite/gi,"anorexia");
    replace_text = replace_text.replace(/lost all his appetite/gi,"anorexia");
    replace_text = replace_text.replace(/lost all her appetite/gi,"anorexia");
    replace_text = replace_text.replace(/has maintained anorexia/gi,"has anorexia");

    replace_text = replace_text.replace(/trouble swallowing/gi,"dysphagia");
    replace_text = replace_text.replace(/difficultly swallowing/gi,"dysphagia");

    replace_text = replace_text.replace(/abdominal pain/gi,"abd. pain");
    replace_text = replace_text.replace(/Loss of consciousness/gi,"LOC");
    replace_text = replace_text.replace(/did not lose consciousness/gi,"No LOC");
    replace_text = replace_text.replace(/Weight loss/gi,"Wt.loss");
    replace_text = replace_text.replace(/pins-and-needles sensation/gi,"parasthesia");
    replace_text = replace_text.replace(/pins-and-needles sensations/gi,"parasthesias");
    replace_text = replace_text.replace(/pins-and-needles/gi,"parasthesias");
    replace_text = replace_text.replace(/joint pain/gi,"arthalgia");
    replace_text = replace_text.replace(/joint pains/gi,"arthalgias");
    replace_text = replace_text.replace(/charlie horses/gi,"cramps");
    replace_text = replace_text.replace(/memory impairment/gi,"memory loss");
    replace_text = replace_text.replace(/an episode of lightheadedness/gi,"a presyncopal episode");
    replace_text = replace_text.replace(/a episode of lightheadedness/gi,"a presyncopal episode");
    replace_text = replace_text.replace(/bowel movement/gi,"BM");
    replace_text = replace_text.replace(/loose in consistency/gi,"loose");
    replace_text = replace_text.replace(/black stools/gi,"melena");
    replace_text = replace_text.replace(/black stool/gi,"melena");
    replace_text = replace_text.replace(/black tarry stools/gi,"melena");
    replace_text = replace_text.replace(/black tarry stool/gi,"melena");
    replace_text = replace_text.replace(/black melanotic stools/gi,"melena");
    replace_text = replace_text.replace(/black melanotic stool/gi,"melena");
    replace_text = replace_text.replace(/melanotic stools/gi,"melena");
    replace_text = replace_text.replace(/melanotic stool/gi,"melena");
    replace_text = replace_text.replace(/black bowel movements/gi,"melena");
    replace_text = replace_text.replace(/black bowel movement/gi,"melena");
    replace_text = replace_text.replace(/blood in stool/gi,"hematochezia");
    replace_text = replace_text.replace(/bright red blood per rectum/gi,"hematochezia");

    replace_text = replace_text.replace(/episodes of diarrhea/gi,"diarrhea");
    replace_text = replace_text.replace(/loose stools/gi,"diarrhea");

    replace_text = replace_text.replace(/pain in the back/gi,"back-pain");
    replace_text = replace_text.replace(/pain in her back/gi,"back-pain");
    replace_text = replace_text.replace(/pain in his back/gi,"back-pain");

    replace_text = replace_text.replace(/threw up/gi,"puked");
    replace_text = replace_text.replace(/throwing up/gi,"puking");
    replace_text = replace_text.replace(/feeling lightheaded/gi,"feeling dizzy");
    replace_text = replace_text.replace(/distention of the abdomen/gi,"abdominal distention");
    replace_text = replace_text.replace(/distention of abdomen/gi,"abdominal distention");
    replace_text = replace_text.replace(/distention of his abdomen/gi,"abdominal distention");
    replace_text = replace_text.replace(/distention of her abdomen/gi,"abdominal distention");

    replace_text = replace_text.replace(/increased frequency of urination/gi,"polyuria");
    replace_text = replace_text.replace(/reduced urine output/gi,"oliguria");
    replace_text = replace_text.replace(/decreased urine output/gi,"oliguria");
    replace_text = replace_text.replace(/decrease in urine output/gi,"oliguria");

    replace_text = replace_text.replace(/bloody urine/gi,"hematuria");
    replace_text = replace_text.replace(/blood in urine/gi,"hematuria");
    replace_text = replace_text.replace(/blood in his urine/gi,"hematuria");
    replace_text = replace_text.replace(/blood in her urine/gi,"hematuria");
    replace_text = replace_text.replace(/bloody urine/gi,"hematuria");
    replace_text = replace_text.replace(/started peeing blood/gi,"had hematuria");
    replace_text = replace_text.replace(/was peeing blood/gi,"had hematuria");
    replace_text = replace_text.replace(/has been peeing blood/gi,"has hematuria");

    replace_text = replace_text.replace(/leg swelling/gi,"leg edema");
    replace_text = replace_text.replace(/swelling of this legs/gi,"leg edema");
    replace_text = replace_text.replace(/swelling in his legs/gi,"leg edema");
    replace_text = replace_text.replace(/swelling of lower extremities/gi,"leg edema");

    replace_text = replace_text.replace(/black stools/gi,"melena");
    replace_text = replace_text.replace(/melanotic stools/gi,"melena");
    replace_text = replace_text.replace(/black tarry stools/gi,"melena");
    replace_text = replace_text.replace(/dark tarry stools/gi,"melena");

    replace_text = replace_text.replace(/syncopal episode/gi,"syncope");
    replace_text = replace_text.replace(/within her baseline range/gi,"at her baseline");
    replace_text = replace_text.replace(/within his baseline range/gi,"at his baseline");
    replace_text = replace_text.replace(/baseline seems to be around/gi,"baseline ~");
    replace_text = replace_text.replace(/baseline is around/gi,"baseline ~");
    replace_text = replace_text.replace(/baseline appears to be ~/gi,"baseline ~");
    replace_text = replace_text.replace(/baseline estimated to be around/gi,"baseline ~");
    replace_text = replace_text.replace(/baseline approximately around/gi,"baseline ~");
    replace_text = replace_text.replace(/baseline creatinine around/gi,"baseline creatinine ~");
    replace_text = replace_text.replace(/baseline creatinine is around/gi,"baseline creatinine ~");

    replace_text = replace_text.replace(/reported that she had some/gi,"had");
    replace_text = replace_text.replace(/reported that he had some/gi,"had");
    replace_text = replace_text.replace(/reported that she had/gi,"had");
    replace_text = replace_text.replace(/reported that he had/gi,"had");

    replace_text = replace_text.replace(/oxygen requirements/gi,"O2 needs");

    replace_text = replace_text.replace(/trouble sleeping/gi,"insomnia");
    replace_text = replace_text.replace(/difficulty sleeping/gi,"insomnia");
    replace_text = replace_text.replace(/trouble falling asleep/gi,"insomnia");
    replace_text = replace_text.replace(/difficulty falling asleep/gi,"insomnia");

    replace_text = replace_text.replace(/decline in functional status/gi,"functional decline");

    replace_text = replace_text.replace(/was unsteady on his feet/gi,"had unsteady gait");
    replace_text = replace_text.replace(/was unsteady on her feet/gi,"had unsteady gait");
    replace_text = replace_text.replace(/unsteady while walking/gi,"unsteady gait");
    replace_text = replace_text.replace(/unsteady while ambulating/gi,"unsteady gait");

    replace_text = replace_text.replace(/continued to have/gi,"had persistent");
    replace_text = replace_text.replace(/continues to have/gi,"has persistent");

        //PROCEDURES

    replace_text = replace_text.replace(/after the procedure/gi,"post-procedure");

    replace_text = replace_text.replace(/history and physical/gi,"H & P");
    replace_text = replace_text.replace(/physical exam/gi,"Exam");
    replace_text = replace_text.replace(/a thorough physical exam/gi,"an exam");
    replace_text = replace_text.replace(/on examination/gi,"on exam");

    replace_text = replace_text.replace(/extensive imaging/gi,"imaging");

    replace_text = replace_text.replace(/chest xray/gi,"CXR");
    replace_text = replace_text.replace(/chest x-ray/gi,"CXR");
    replace_text = replace_text.replace(/chest radiograph/gi,"CXR");
    replace_text = replace_text.replace(/ultrasound/gi,"U/S");
    replace_text = replace_text.replace(/ultra-sound/gi,"U/S");
    replace_text = replace_text.replace(/CT of the Head/gi,"Head-CT");
    replace_text = replace_text.replace(/CT of Head/gi,"Head-CT");
    replace_text = replace_text.replace(/CT-scan of the Head/gi,"Head-CT");
    replace_text = replace_text.replace(/CT scan of the Head/gi,"Head-CT");
    replace_text = replace_text.replace(/CT-scan of Head/gi,"Head-CT");
    replace_text = replace_text.replace(/CT scan of Head/gi,"Head-CT");
    replace_text = replace_text.replace(/CT head without contrast/gi,"Plain Head-CT");
    replace_text = replace_text.replace(/CT-head without contrast/gi,"Plain Head-CT");

    replace_text = replace_text.replace(/CT of the Chest/gi,"Chest-CT");
    replace_text = replace_text.replace(/CT of Chest/gi,"Chest-CT");
    replace_text = replace_text.replace(/CT-scan of the Chest/gi,"Chest-CT");
    replace_text = replace_text.replace(/CT scan of the Chest/gi,"Chest-CT");
    replace_text = replace_text.replace(/CT-scan of Chest/gi,"Chest-CT");
    replace_text = replace_text.replace(/CT scan of Chest/gi,"Chest-CT");

    replace_text = replace_text.replace(/CT Abdomen pelvis/gi,"CT-AP");
    replace_text = replace_text.replace(/CT Abdomen-pelvis/gi,"CT-AP");
    replace_text = replace_text.replace(/CT of the Abdomen-pelvis/gi,"CT-AP");
    replace_text = replace_text.replace(/CT of Abdomen-pelvis/gi,"CT-AP");
    replace_text = replace_text.replace(/CT-scan of the Abdomen-pelvis/gi,"CT-AP");
    replace_text = replace_text.replace(/CT scan Abdomen-pelvis/gi,"CT-AP");
    replace_text = replace_text.replace(/CT scan of Abdomen-pelvis/gi,"CT-AP");
    replace_text = replace_text.replace(/CT angiogram/gi,"CTA");
    replace_text = replace_text.replace(/angiography study/gi,"angiogram");
    replace_text = replace_text.replace(/MRI of the Brain/gi,"Brain-MRI");

    replace_text = replace_text.replace(/echocardiogram/gi, "ECHO");
    replace_text = replace_text.replace(/coronary artery bypass grafting/gi, "CABG");
    replace_text = replace_text.replace(/coronary artery bypass graft/gi, "CABG");
    replace_text = replace_text.replace(/coronary artery bypass/gi, "CABG");
    replace_text = replace_text.replace(/quadruple bypass/gi, "CABG X 4");

    replace_text = replace_text.replace(/electrocardiogram/gi, "EKG");
    replace_text = replace_text.replace(/electrocardiographic/gi, "EKG");
    replace_text = replace_text.replace(/ejection fraction/gi,"EF");

    replace_text = replace_text.replace(/biopsy/gi,"Bx");

    replace_text = replace_text.replace(/Pulmonary Function test/gi,"PFT");
    replace_text = replace_text.replace(/endobronchial ultrasound/gi,"EBUS");
    replace_text = replace_text.replace(/endobronchial U\/S/gi,"EBUS");
    replace_text = replace_text.replace(/endobronchial US/gi,"EBUS");
    replace_text = replace_text.replace(/Bronchoscopy/gi,"Bronch.");
    replace_text = replace_text.replace(/Kidney Transplantation/gi,"Renal-TX");
    replace_text = replace_text.replace(/Kidney Transplant/gi,"Renal-TX");
    replace_text = replace_text.replace(/Renal Transplantation/gi,"Renal-TX");
    replace_text = replace_text.replace(/Renal Transplant/gi,"Renal-TX");
    replace_text = replace_text.replace(/Hemodialysis/gi,"HD");
    replace_text = replace_text.replace(/Monday, wednesday and friday/gi,"MWF");
    replace_text = replace_text.replace(/Monday, wednesday & friday/gi,"MWF");
    replace_text = replace_text.replace(/Monday, wednesday, friday/gi,"MWF");
    replace_text = replace_text.replace(/Anticoagulation/gi,"Anticoag");
    replace_text = replace_text.replace(/Laparoscopic cholecystectomy/gi,"Lap.chole");
    replace_text = replace_text.replace(/Transesophageal echocardiogram/gi,"TEE");
    replace_text = replace_text.replace(/Appendectomy/gi,"Appy");
    replace_text = replace_text.replace(/Bronchoscopy/gi,"Bronch");
    replace_text = replace_text.replace(/nasogastric tube/gi,"NG");
    replace_text = replace_text.replace(/orogastric tube/gi,"OG");
    replace_text = replace_text.replace(/Percutaneous gastrojejunostomy tube /gi,"PEG Tube");
    replace_text = replace_text.replace(/Foley catheter/gi,"Foley C.");
    replace_text = replace_text.replace(/Foley cath/gi,"Foley C.");
    replace_text = replace_text.replace(/Total Knee Arthroplasty/gi,"TKA");
    replace_text = replace_text.replace(/Lumbar Puncture/gi,"LP");
    replace_text = replace_text.replace(/postoperative /gi,"post-op");
    replace_text = replace_text.replace(/preoperative /gi,"pre-op");
    replace_text = replace_text.replace(/to rule out/gi,"to r/o");
    replace_text = replace_text.replace(/above-knee amputation/gi,"AKA");
    replace_text = replace_text.replace(/below-knee amputation/gi,"BKA");
    replace_text = replace_text.replace(/above knee amputation/gi,"AKA");
    replace_text = replace_text.replace(/below knee amputation/gi,"BKA");
    replace_text = replace_text.replace(/carotid endarterectomy/gi,"CEA");
    replace_text = replace_text.replace(/right carotid endarterectomy/gi,"Rt. CEA");
    replace_text = replace_text.replace(/left carotid endarterectomy/gi,"Lft. CEA");
    replace_text = replace_text.replace(/DVT prophylaxis/gi,"DVT ppx");
    replace_text = replace_text.replace(/GI prophylaxis/gi,"GI ppx");
    replace_text = replace_text.replace(/physical therapy/gi,"PT");
    replace_text = replace_text.replace(/occupational therapy/gi,"OT");
    replace_text = replace_text.replace(/hyperbaric oxygen/gi,"HBO");
    replace_text = replace_text.replace(/removal of stent/gi,"stent removal");
    replace_text = replace_text.replace(/insertion of stent/gi,"stent insertion");
    replace_text = replace_text.replace(/placement of stent/gi,"stent placement");
    replace_text = replace_text.replace(/surgical intervention/gi,"surgery");

    replace_text = replace_text.replace(/has had her appendix removed/gi,"is s/p appy.");
    replace_text = replace_text.replace(/has had his appendix removed/gi,"is s/p appy.");

        //LABS & RESULTS

    replace_text = replace_text.replace(/initial lab work/gi,"labs");
    replace_text = replace_text.replace(/initial lab assessment/gi,"labs");
    replace_text = replace_text.replace(/initial laboratory assessment/gi,"labs");
    replace_text = replace_text.replace(/lab assessment/gi,"labs");
    replace_text = replace_text.replace(/labs assessment/gi,"labs");
    replace_text = replace_text.replace(/laboratory assessment/gi,"labs");
    replace_text = replace_text.replace(/laboratory tests/gi,"labs");
    replace_text = replace_text.replace(/laboratory evaluation/gi,"labs");
    replace_text = replace_text.replace(/Blood work/gi,"labs");
    replace_text = replace_text.replace(/lab work/gi,"labs");
    replace_text = replace_text.replace(/labwork/gi,"labs");
    replace_text = replace_text.replace(/lab-work/gi,"labs");
    replace_text = replace_text.replace(/lab tests/gi,"labs");
    replace_text = replace_text.replace(/level slightly elevated at/gi,"");
    replace_text = replace_text.replace(/started trending upwards/gi,"trended up");

    replace_text = replace_text.replace(/showed no acute abnormalities/gi,"was normal");
    replace_text = replace_text.replace(/showed no acute findings/gi,"was normal");
    replace_text = replace_text.replace(/showed no acute pathology/gi,"was normal");
    replace_text = replace_text.replace(/didn't show any acute abnormalities/gi,"was normal");
    replace_text = replace_text.replace(/did not show any acute abnormalities/gi,"was normal");
    replace_text = replace_text.replace(/didn't show any acute findings/gi,"was normal");
    replace_text = replace_text.replace(/did not show any acute findings/gi,"was normal");
    replace_text = replace_text.replace(/didn't show any acute pathology/gi,"was normal");
    replace_text = replace_text.replace(/did not show any acute pathology/gi,"was normal");
    replace_text = replace_text.replace(/did not show any acute/gi,"was -ve for");
    replace_text = replace_text.replace(/stable from prior/gi,"unchanged");

    replace_text = replace_text.replace(/showed no evidence of/gi,"was -ve for");
    replace_text = replace_text.replace(/showed no evidence for/gi,"was -ve for");
    replace_text = replace_text.replace(/shows no evidence of/gi,"is -ve for");
    replace_text = replace_text.replace(/shows no evidence for/gi,"is -ve for");
    replace_text = replace_text.replace(/showed findings consistent with/gi,"showed");
    replace_text = replace_text.replace(/showed changes consistent with/gi,"showed");
    replace_text = replace_text.replace(/showed pathology consistent with/gi,"showed");
    replace_text = replace_text.replace(/was consistent with/gi,"showed");
    replace_text = replace_text.replace(/consistent with/gi,"showed");
    replace_text = replace_text.replace(/discussed with/gi,"d/w");

    replace_text = replace_text.replace(/was elevated at/gi,"was ");
    replace_text = replace_text.replace(/was very elevated at/gi,"was ");
    replace_text = replace_text.replace(/was also elevated at/gi,"was ");

    replace_text = replace_text.replace(/Was checked which was positive for/gi,"+ve for");
    replace_text = replace_text.replace(/came back positive for/gi,"was +ve for");
    replace_text = replace_text.replace(/came back negative for/gi,"was -ve for");

    replace_text = replace_text.replace(/ended up growing/gi,"grew");

    replace_text = replace_text.replace(/turned out to be positive for/gi,"was +ve for");
    replace_text = replace_text.replace(/turned out to be negative for/gi,"was -ve for");
    replace_text = replace_text.replace(/came back negative/gi,"was -ve");
    replace_text = replace_text.replace(/came back as negative/gi,"was -ve");
    replace_text = replace_text.replace(/came back positive/gi,"was +ve");
    replace_text = replace_text.replace(/came back as positive/gi,"was +ve");
    replace_text = replace_text.replace(/came back unremarkable/gi,"was normal");
    replace_text = replace_text.replace(/came back as unremarkable/gi,"was normal");

    replace_text = replace_text.replace(/was positive for/gi,"+ve for");
    replace_text = replace_text.replace(/is positive for/gi,"+ve for");
    replace_text = replace_text.replace(/are positive for/gi,"+ve for");
    replace_text = replace_text.replace(/was negative for/gi,"-ve for");
    replace_text = replace_text.replace(/is negative for/gi,"is -ve for");
    replace_text = replace_text.replace(/are negative for/gi,"-ve for");
    replace_text = replace_text.replace(/within normal limits/gi,"normal");
    replace_text = replace_text.replace(/was normal at/gi,"was ");
    replace_text = replace_text.replace(/was low at/gi,"was ");
    replace_text = replace_text.replace(/was very low at/gi,"was ");
    replace_text = replace_text.replace(/was elevated at/gi,"was ");
    replace_text = replace_text.replace(/was extremely elevated at/gi,"was ");
    replace_text = replace_text.replace(/was high at/gi,"was ");
    replace_text = replace_text.replace(/was very high at/gi,"was ");
    replace_text = replace_text.replace(/was normal/gi,"was WNL");
    replace_text = replace_text.replace(/was unremarkable/gi,"was normal");
    replace_text = replace_text.replace(/were unremarkable/gi,"were normal");
    replace_text = replace_text.replace(/is remarkable for/gi,"showed");
    replace_text = replace_text.replace(/was remarkable for/gi,"showed");
    replace_text = replace_text.replace(/were remarkable for/gi,"showed");
    replace_text = replace_text.replace(/revealed/gi,"showed");
    replace_text = replace_text.replace(/reveals/gi,"shows");
    replace_text = replace_text.replace(/resulting in/gi,"causing");

    replace_text = replace_text.replace(/did not show/gi,"didn't show");

    replace_text = replace_text.replace(/was also ordered which showed/gi,"showed");
    replace_text = replace_text.replace(/was also ordered that showed/gi,"showed");
    replace_text = replace_text.replace(/was ordered which showed/gi,"showed");
    replace_text = replace_text.replace(/was ordered that showed/gi,"showed");
    replace_text = replace_text.replace(/was ordered showing/gi,"showed");
    replace_text = replace_text.replace(/was ordered which was/gi,"was");
    replace_text = replace_text.replace(/was ordered and was/gi,"was");

    replace_text = replace_text.replace(/was also done which showed/gi,"showed");
    replace_text = replace_text.replace(/was also done that showed/gi,"showed");
    replace_text = replace_text.replace(/was done which showed/gi,"showed");
    replace_text = replace_text.replace(/was done that showed/gi,"showed");
    replace_text = replace_text.replace(/was done showing/gi,"showed");
    replace_text = replace_text.replace(/was done which was/gi,"was");
    replace_text = replace_text.replace(/was done and was/gi,"was");

    replace_text = replace_text.replace(/was also obtained which showed/gi,"showed");
    replace_text = replace_text.replace(/was also obtained that showed/gi,"showed");
    replace_text = replace_text.replace(/was obtained which showed/gi,"showed");
    replace_text = replace_text.replace(/was obtained that showed/gi,"showed");
    replace_text = replace_text.replace(/was obtained showing/gi,"showed");
    replace_text = replace_text.replace(/was obtained which was/gi,"was");
    replace_text = replace_text.replace(/was obtained and was/gi,"was");

    replace_text = replace_text.replace(/was also performed that showed/gi,"showed");
    replace_text = replace_text.replace(/was also performed which showed/gi,"showed");
    replace_text = replace_text.replace(/was performed that showed/gi,"showed");
    replace_text = replace_text.replace(/was performed which showed/gi,"showed");
    replace_text = replace_text.replace(/was performed showing/gi,"showed");
    replace_text = replace_text.replace(/was performed which was/gi,"was");
    replace_text = replace_text.replace(/was performed and was/gi,"was");

    replace_text = replace_text.replace(/was also check which showed/gi,"showed");
    replace_text = replace_text.replace(/was also checked that showed/gi,"showed");
    replace_text = replace_text.replace(/was checked which showed/gi,"showed");
    replace_text = replace_text.replace(/was checked that showed/gi,"showed");
    replace_text = replace_text.replace(/was checked showing/gi,"showed");
    replace_text = replace_text.replace(/was checked which was/gi,"was");
    replace_text = replace_text.replace(/was checked and was/gi,"was");

    replace_text = replace_text.replace(/were also check which showed/gi,"showed");
    replace_text = replace_text.replace(/were also checked that showed/gi,"showed");
    replace_text = replace_text.replace(/were checked which showed/gi,"showed");
    replace_text = replace_text.replace(/were checked that showed/gi,"showed");
    replace_text = replace_text.replace(/were checked showing/gi,"showed");
    replace_text = replace_text.replace(/were checked which were/gi,"were");
    replace_text = replace_text.replace(/were checked and were/gi,"were");

    replace_text = replace_text.replace(/came back positive/gi,"was +ve");
    replace_text = replace_text.replace(/came back negative/gi,"was -ve");
    replace_text = replace_text.replace(/was reported as positive/gi,"was +ve");
    replace_text = replace_text.replace(/was reported as negative/gi,"was -ve");
    replace_text = replace_text.replace(/was reported as/gi,"was");
    replace_text = replace_text.replace(/is reported as/gi,"is");
    replace_text = replace_text.replace(/was also obtained showing/gi,"showed");
    replace_text = replace_text.replace(/was also obtained which showed/gi,"showed");

    replace_text = replace_text.replace(/concerning for/gi,"showed");

    replace_text = replace_text.replace(/complete blood count/gi,"CBC");
    replace_text = replace_text.replace(/complete blood cell count/gi,"CBC");
    replace_text = replace_text.replace(/White blood cell count/gi,"WBC");
    replace_text = replace_text.replace(/White blood cells count/gi,"WBC");
    replace_text = replace_text.replace(/White blood cells/gi,"WBC");
    replace_text = replace_text.replace(/White blood cell/gi,"WBC");
    replace_text = replace_text.replace(/White cell count/gi,"WBC");
    replace_text = replace_text.replace(/White cells count/gi,"WBC");
    replace_text = replace_text.replace(/White count/gi,"WBC");
    replace_text = replace_text.replace(/WBC count/gi,"WBC");
    replace_text = replace_text.replace(/WBC level/gi,"WBC");
    replace_text = replace_text.replace(/WBC was elevated at/gi,"WBC");
    replace_text = replace_text.replace(/WBC was elevated to/gi,"WBC");
    replace_text = replace_text.replace(/WBC was slightly elevated at/gi,"WBC");
    replace_text = replace_text.replace(/WBC was slightly elevated to/gi,"WBC");
    replace_text = replace_text.replace(/WBC was normal at/gi,"WBC");
    replace_text = replace_text.replace(/WBC elevated at/gi,"WBC");
    replace_text = replace_text.replace(/WBC elevated to/gi,"WBC");
    replace_text = replace_text.replace(/WBC slightly elevated at/gi,"WBC");
    replace_text = replace_text.replace(/WBC slightly elevated to/gi,"WBC");
    replace_text = replace_text.replace(/WBC normal at/gi,"WBC");
    replace_text = replace_text.replace(/a WBC of/gi,"WBC");
    replace_text = replace_text.replace(/WBC of/gi,"WBC");

    replace_text = replace_text.replace(/platelet count/gi,"PLT");
    replace_text = replace_text.replace(/PLT of/gi,"PLT");

    replace_text = replace_text.replace(/hemoglobin/gi,"Hgb");
    replace_text = replace_text.replace(/Hgb level/gi,"Hgb");
    replace_text = replace_text.replace(/Mean corpuscular volume/gi,"MCV");
    replace_text = replace_text.replace(/electrolyte panel/gi,"BMP");
    replace_text = replace_text.replace(/basic metabolic panel/gi,"BMP");
    replace_text = replace_text.replace(/comprehensive metabolic panel/gi,"CMP");
    replace_text = replace_text.replace(/Liver Enzymes/gi,"LFTs");
    replace_text = replace_text.replace(/Liver function tests/gi,"LFTs");
    replace_text = replace_text.replace(/Liver Panel/gi,"LFTs");
    replace_text = replace_text.replace(/Liver chemistry Panel/gi,"LFTs");
    replace_text = replace_text.replace(/Liver chemistry/gi,"LFTs");
    replace_text = replace_text.replace(/elevated ammonia level/gi,"hyperammonemia");
    replace_text = replace_text.replace(/urine drug screen/gi,"UDS");
    replace_text = replace_text.replace(/sodium/gi,"Na+");
    replace_text = replace_text.replace(/potassium/gi,"K+");
    replace_text = replace_text.replace(/carbondioxide/gi,"CO2");
    replace_text = replace_text.replace(/carbon-dioxide/gi,"CO2");
    replace_text = replace_text.replace(/carbon dioxide/gi,"CO2");
    replace_text = replace_text.replace(/blood urea nitrogen/gi,"BUN");
    replace_text = replace_text.replace(/phosphorous/gi,"Phos.");
    replace_text = replace_text.replace(/magnesium/gi,"Mag.");
    replace_text = replace_text.replace(/alkaline phosphatase/gi,"ALK");
    replace_text = replace_text.replace(/total bilirubin/gi,"T.Bili");
    replace_text = replace_text.replace(/gram-positive/gi,"Gm +ve");
    replace_text = replace_text.replace(/gram positive/gi,"Gm +ve");
    replace_text = replace_text.replace(/gram-negative/gi,"Gm -ve");
    replace_text = replace_text.replace(/gram negative/gi,"Gm -ve");
    replace_text = replace_text.replace(/troponin/gi,"Trop.");
    replace_text = replace_text.replace(/blood glucose/gi,"Glucose");
    replace_text = replace_text.replace(/serum glucose/gi,"Glucose");
    replace_text = replace_text.replace(/blood cultures/gi,"Bld. Cultures");
    replace_text = replace_text.replace(/urine drug screen/gi,"UDS");
    replace_text = replace_text.replace(/Urinalysis/gi,"UA");
    replace_text = replace_text.replace(/urine analysis/gi,"UA");
    replace_text = replace_text.replace(/cerebrospinal fluid/gi,"CSF");
    replace_text = replace_text.replace(/arterial blood gases/gi,"ABGs");
    replace_text = replace_text.replace(/arterial blood gas/gi,"ABG");
    replace_text = replace_text.replace(/venous blood gases/gi,"VBGs");
    replace_text = replace_text.replace(/venous blood gas/gi,"VBG");
    replace_text = replace_text.replace(/Thyroid stimulating hormone/gi,"TSH");
    replace_text = replace_text.replace(/Thyroid-stimulating hormone/gi,"TSH");
    replace_text = replace_text.replace(/Erythrocyte sedimentation rate/gi,"ESR");
    replace_text = replace_text.replace(/C-reactive protein/gi,"CRP");
    replace_text = replace_text.replace(/ C reactive protein/gi,"CRP");
    replace_text = replace_text.replace(/Anti-Nuclear Antibody/gi,"ANA");
    replace_text = replace_text.replace(/AntiNuclear Antibody/gi,"ANA");
    replace_text = replace_text.replace(/Anti Nuclear Antibody/gi,"ANA");
    replace_text = replace_text.replace(/Serum B12/gi,"B12");
    replace_text = replace_text.replace(/Serum-B12/gi,"B12");

    replace_text = replace_text.replace(/baseline creatinine is at around/gi,"baseline Creatinine ~");
    replace_text = replace_text.replace(/baseline creatinine is around/gi,"baseline Creatinine ~");
    replace_text = replace_text.replace(/baseline creatinine around/gi,"baseline Creatinine ~");
    replace_text = replace_text.replace(/baseline around/gi,"baseline ~");
    replace_text = replace_text.replace(/baseline is around/gi,"baseline ~");
    replace_text = replace_text.replace(/baseline around/gi,"baseline ~");

    replace_text = replace_text.replace(/emphysematous changes/gi,"Emphysema");
    replace_text = replace_text.replace(/changes of emphysema/gi,"Emphysema");
    replace_text = replace_text.replace(/airspace consolidation/gi,"consolidation");

    replace_text = replace_text.replace(/too numerous to count/gi,"packed");

        //MEDICATIONS

    replace_text = replace_text.replace(/was given a dose of/gi,"was given");
    replace_text = replace_text.replace(/medications/gi,"meds");
    replace_text = replace_text.replace(/on a regimen of/gi,"on");
    replace_text = replace_text.replace(/with a regimen of/gi,"with");
    replace_text = replace_text.replace(/immunosuppressive medications/gi,"Immunesuppresive Meds");
    replace_text = replace_text.replace(/polysubstance/gi,"Polydrug");
    replace_text = replace_text.replace(/Calcium channel blockers/gi,"CCBs");
    replace_text = replace_text.replace(/Calcium channel blocker/gi,"CCB");
    replace_text = replace_text.replace(/hydrochlorthiazide/gi,"HCTZ");
    replace_text = replace_text.replace(/hydrochlorothiazide/gi,"HCTZ");
    replace_text = replace_text.replace(/methotrexate/gi,"MTX");
    replace_text = replace_text.replace(/nitroglycerin/gi,"NTG");
    replace_text = replace_text.replace(/alteplase/gi,"tPA");
    replace_text = replace_text.replace(/Chemotherapy/gi,"ChemoRx");
    replace_text = replace_text.replace(/Antihypertensive/gi,"Anti-HTN");
    replace_text = replace_text.replace(/Antihypertensives/gi,"Anti-HTN Meds");
    replace_text = replace_text.replace(/Anti-anxiety meds/gi,"anxiolytics");
    replace_text = replace_text.replace(/Anti-anxiety medication/gi,"anxiolytic");
    replace_text = replace_text.replace(/Anti-anxiety medications/gi,"anxiolytics");
    replace_text = replace_text.replace(/Anti-anxiety drugs/gi,"anxiolytics");
    replace_text = replace_text.replace(/Anti-anxiety medicine/gi,"anxiolytic");
    replace_text = replace_text.replace(/Anti-anxiety medicines/gi,"anxiolytics");
    replace_text = replace_text.replace(/antibiotics/gi,"AntiBx");
    replace_text = replace_text.replace(/vancomycin/gi,"Vanco.");
    replace_text = replace_text.replace(/cefepime/gi,"Cefepime");
    replace_text = replace_text.replace(/ceftriaxone/gi,"Ceftriaxone");
    replace_text = replace_text.replace(/rocephin/gi,"Rocephin");
    replace_text = replace_text.replace(/piperacillin–tazobactam/gi,"Zosyn");

    replace_text = replace_text.replace(/nonsteroidal anti-inflammatory drugs/gi,"NSAIDs");
    replace_text = replace_text.replace(/nonsteroidal antiinflammatory drugs/gi,"NSAIDs");
    replace_text = replace_text.replace(/nonsteroidal anti inflammatory drugs/gi,"NSAIDs");

    replace_text = replace_text.replace(/sliding scale insulin/gi,"S/S Insulin");
    replace_text = replace_text.replace(/sliding-scale insulin/gi,"S/S Insulin");

    replace_text = replace_text.replace(/intravenous/gi,"IV");
    replace_text = replace_text.replace(/intravenously/gi,"IV");
    replace_text = replace_text.replace(/normal saline/gi,"NS");
    replace_text = replace_text.replace(/Ringers Lactate/gi,"LR");
    replace_text = replace_text.replace(/pain control/gi,"analgesia");
    replace_text = replace_text.replace(/Aspirin/gi,"ASA");
    replace_text = replace_text.replace(/twice a day/gi,"BID");
    replace_text = replace_text.replace(/twice daily/gi,"BID");
    replace_text = replace_text.replace(/three times a day/gi,"TID");
    replace_text = replace_text.replace(/four times a day/gi,"QID");
    replace_text = replace_text.replace(/once a month/gi,"monthly");
    replace_text = replace_text.replace(/once a week/gi,"weekly");
    replace_text = replace_text.replace(/once a year/gi,"annually");
    replace_text = replace_text.replace(/once per year/gi,"annually");
    replace_text = replace_text.replace(/once per month/gi,"monthly");
    replace_text = replace_text.replace(/once per week/gi,"weekly");
    replace_text = replace_text.replace(/every 12 hours/gi,"q12h");
    replace_text = replace_text.replace(/every 8 hours/gi,"q8h");
    replace_text = replace_text.replace(/every 6 hours/gi,"q6h");
    replace_text = replace_text.replace(/every 4 hours/gi,"q4h");
    replace_text = replace_text.replace(/every 2 hours/gi,"q2h");
    replace_text = replace_text.replace(/every hour/gi,"q1h");

    replace_text = replace_text.replace(/packed red blood cells/gi,"PRBC");
    replace_text = replace_text.replace(/packed RBCs/gi,"PRBC");
    replace_text = replace_text.replace(/fresh frozen plasma/gi,"FFP");

    replace_text = replace_text.replace(/throughout the day/gi,"all day");

    replace_text = replace_text.replace(/ water /gi," H2O ");
    replace_text = replace_text.replace(/alcohol/gi,"ETOH");
    replace_text = replace_text.replace(/ferrous sulphate/gi,"FeSO4");
    replace_text = replace_text.replace(/bicarbonate/gi,"bicarb");
    replace_text = replace_text.replace(/potassium chloride/gi,"KCL");
    replace_text = replace_text.replace(/sodiumm chloride/gi,"NaCL");
    replace_text = replace_text.replace(/magnesium sulphate/gi,"MgSO4");
    replace_text = replace_text.replace(/magnesium sulfate/gi,"MgSO4");
    replace_text = replace_text.replace(/milk of magnesium/gi,"MOM");
    replace_text = replace_text.replace(/milk of magnesia/gi,"MOM");
    replace_text = replace_text.replace(/given orally/gi,"given PO");
    replace_text = replace_text.replace(/taken orally/gi,"taken PO");
    replace_text = replace_text.replace(/subcutaneous/gi,"SQ");
    replace_text = replace_text.replace(/subcutaneously/gi,"Subcut");
    replace_text = replace_text.replace(/intramuscular/gi,"IM");
    replace_text = replace_text.replace(/intramuscularly/gi,"IM");

    replace_text = replace_text.replace(/over the counter/gi,"OTC");
    replace_text = replace_text.replace(/over-the-counter/gi,"OTC");

    replace_text = replace_text.replace(/was put on hold/gi,"was held");
    replace_text = replace_text.replace(/were put on hold/gi,"were held");

        //LATERALITY

    replace_text = replace_text.replace(/right flank/gi,"Rt.flank");
    replace_text = replace_text.replace(/left flank/gi,"Lt.flank");
    replace_text = replace_text.replace(/right side/gi,"Rt.side");
    replace_text = replace_text.replace(/right sided/gi,"Rt.sided");
    replace_text = replace_text.replace(/right-sided/gi,"Rt.sided");
    replace_text = replace_text.replace(/left side/gi,"Lt. side");
    replace_text = replace_text.replace(/left sided/gi,"Lt. sided");
    replace_text = replace_text.replace(/left sided/gi,"Lt-sided");
    replace_text = replace_text.replace(/left lower lobe/gi,"LLL");
    replace_text = replace_text.replace(/left upper lobe/gi,"LUL");
    replace_text = replace_text.replace(/Right lower lobe/gi,"RLL");
    replace_text = replace_text.replace(/Right upper lobe/gi,"RUL");
    replace_text = replace_text.replace(/left lower lung/gi,"LLL");
    replace_text = replace_text.replace(/left upper lung/gi,"LUL");
    replace_text = replace_text.replace(/Right lower lung/gi,"RLL");
    replace_text = replace_text.replace(/Right upper lung/gi,"RUL");

    replace_text = replace_text.replace(/left lower quadrant/gi,"LLQ");
    replace_text = replace_text.replace(/right lower quadrant/gi,"RLQ");
    replace_text = replace_text.replace(/left upper quadrant/gi,"LUQ");
    replace_text = replace_text.replace(/right upper quadrant/gi,"RUQ");
    replace_text = replace_text.replace(/left greater than right/gi,"L > R");
    replace_text = replace_text.replace(/right greater than left/gi,"R > L");
    replace_text = replace_text.replace(/bilateral/gi,"Bil.");
    replace_text = replace_text.replace(/right femoral/gi,"Rt. Fem.");
    replace_text = replace_text.replace(/left femoral/gi,"Lft. Fem.");
    replace_text = replace_text.replace(/right hip/gi,"Rt. Hip");
    replace_text = replace_text.replace(/left hip/gi,"Lt. Hip.");
    replace_text = replace_text.replace(/Right upper and lower extremity/gi,"RUE+RLE");
    replace_text = replace_text.replace(/Left upper and lower extremity/gi,"LUE+LLE");
    replace_text = replace_text.replace(/right upper extremity/gi,"RUE");
    replace_text = replace_text.replace(/left upper extremity/gi,"LUE");
    replace_text = replace_text.replace(/right lower extremity/gi,"RLE");
    replace_text = replace_text.replace(/left lower extremity/gi,"LLE");

    replace_text = replace_text.replace(/right total knee replacement/gi,"Rt. TKA");
    replace_text = replace_text.replace(/right knee replacement/gi,"Rt. TKA");
    replace_text = replace_text.replace(/left total knee replacement/gi,"Lft. TKA");
    replace_text = replace_text.replace(/left knee replacement/gi,"Lft. TKA");
    replace_text = replace_text.replace(/right knee/gi,"Rt. knee");
    replace_text = replace_text.replace(/left knee/gi,"Lft. knee");

    replace_text = replace_text.replace(/right greater than left/gi,"R > L");
    replace_text = replace_text.replace(/left greater than right/gi,"L > R");

        //PATIENT

    replace_text = replace_text.replace(/year old caucasian female/gi,"/y/o/White/F");
    replace_text = replace_text.replace(/year old caucasian lady/gi,"/y/o/White/F");
    replace_text = replace_text.replace(/year old caucasian woman/gi,"/y/o/White/F");
    replace_text = replace_text.replace(/year old caucasian gentleman/gi,"/y/o/White/M");
    replace_text = replace_text.replace(/year old caucasian man/gi,"/y/o/White/M");
    replace_text = replace_text.replace(/year old caucasian male/gi,"/y/o/White/M");

    replace_text = replace_text.replace(/year old while female/gi,"/y/o/White/F");
    replace_text = replace_text.replace(/year old white lady/gi,"/y/o/White/F");
    replace_text = replace_text.replace(/year old white woman/gi,"/y/o/White/F");
    replace_text = replace_text.replace(/year old white gentleman/gi,"/y/o/White/M");
    replace_text = replace_text.replace(/year old white man/gi,"/y/o/White/M");
    replace_text = replace_text.replace(/year old wite male/gi,"/y/o/White/M");

    replace_text = replace_text.replace(/year old african-american female/gi,"/y/o/Black/F");
    replace_text = replace_text.replace(/year old african-american lady/gi,"/y/o/Black/F");
    replace_text = replace_text.replace(/year old african-american woman/gi,"/y/o/Black/F");
    replace_text = replace_text.replace(/year old african-american gentleman/gi,"/y/o/Black/M");
    replace_text = replace_text.replace(/year old african-american man/gi,"/y/o/Black/M");
    replace_text = replace_text.replace(/year old african-american male/gi,"/y/o/Black/M");

    replace_text = replace_text.replace(/year old african-american female/gi,"/y/o/Black/F");
    replace_text = replace_text.replace(/year old african-american lady/gi,"/y/o/Black/F");
    replace_text = replace_text.replace(/year old african-american woman/gi,"/y/o/Black/F");
    replace_text = replace_text.replace(/year old african-american gentleman/gi,"/y/o/Black/M");
    replace_text = replace_text.replace(/year old african-american man/gi,"/y/o/Black/M");
    replace_text = replace_text.replace(/year old african-american male/gi,"/y/o/Black/M");

    replace_text = replace_text.replace(/year old asian female/gi,"/y/o/Asian/F");
    replace_text = replace_text.replace(/year old asian lady/gi,"/y/o/Asian/F");
    replace_text = replace_text.replace(/year old asian woman/gi,"/y/o/Asian/F");
    replace_text = replace_text.replace(/year old asian gentleman/gi,"/y/o/Asian/M");
    replace_text = replace_text.replace(/year old asian man/gi,"/y/o/Asian/M");
    replace_text = replace_text.replace(/year old asian male/gi,"/y/o/Asian/M");

    replace_text = replace_text.replace(/year old native american female/gi,"/y/o/Native/F");
    replace_text = replace_text.replace(/year old native american lady/gi,"/y/o/Native/F");
    replace_text = replace_text.replace(/year old native american woman/gi,"/y/o/Native/F");
    replace_text = replace_text.replace(/year old native american gentleman/gi,"/y/o/Native/M");
    replace_text = replace_text.replace(/year old native american man/gi,"/y/o/Native/M");
    replace_text = replace_text.replace(/year old native american male/gi,"/y/o/Native/M");

    replace_text = replace_text.replace(/year old native-american female/gi,"/y/o/Native/F");
    replace_text = replace_text.replace(/year old native-american lady/gi,"/y/o/Native/F");
    replace_text = replace_text.replace(/year old native-american woman/gi,"/y/o/Native/F");
    replace_text = replace_text.replace(/year old native-american gentleman/gi,"/y/o/Native/M");
    replace_text = replace_text.replace(/year old native-american man/gi,"/y/o/Native/M");
    replace_text = replace_text.replace(/year old native-american male/gi,"/y/o/Native/M");

    replace_text = replace_text.replace(/ year old male/gi,"/y/o/M");
    replace_text = replace_text.replace(/ years old male/gi,"/y/o/M");
    replace_text = replace_text.replace(/-year-old-male/gi,"/y/o/M");
    replace_text = replace_text.replace(/year-old-male/gi,"/y/o/M");
    replace_text = replace_text.replace(/-year-old male/gi,"/y/o/M");
    replace_text = replace_text.replace(/ yr old male/gi,"/y/o/M");
    replace_text = replace_text.replace(/ yo male/gi,"/y/o/M");
    replace_text = replace_text.replace(/ year old man/gi,"/y/o/M");
    replace_text = replace_text.replace(/ years old man/gi,"/y/o/M");
    replace_text = replace_text.replace(/-year-old man/gi,"/y/o/M");
    replace_text = replace_text.replace(/ yo man/gi,"/y/o/M");
    replace_text = replace_text.replace(/ year old gentleman/gi,"/y/o/M");
    replace_text = replace_text.replace(/-year-old gentleman/gi,"/y/o/M");
    replace_text = replace_text.replace(/ year-old-gentleman/gi,"/y/o/M");
    replace_text = replace_text.replace(/ yo gentleman/gi,"/y/o/M");
    replace_text = replace_text.replace(/ years old gentleman/gi,"/y/o/M");

    replace_text = replace_text.replace(/-year-old female/gi,"/y/o/F");
    replace_text = replace_text.replace(/-year-old-female/gi,"/y/o/F");
    replace_text = replace_text.replace(/ year old female/gi,"/y/o/F");
    replace_text = replace_text.replace(/ years old female/gi,"/y/o/F");
    replace_text = replace_text.replace(/ yr old female/gi,"/y/o/F");
    replace_text = replace_text.replace(/ yo female/gi,"/y/o/F");
    replace_text = replace_text.replace(/ year old lady/gi,"/y/o/F");
    replace_text = replace_text.replace(/-year-old lady/gi,"/y/o/F");
    replace_text = replace_text.replace(/ yr old lady/gi,"/y/o/F");
    replace_text = replace_text.replace(/ yo lady/gi,"/y/o/F");
    replace_text = replace_text.replace(/ year old woman/gi,"/y/o/F");
    replace_text = replace_text.replace(/ year-old-woman/gi,"/y/o/F");
    replace_text = replace_text.replace(/ yr old woman/gi,"/y/o/F");
    replace_text = replace_text.replace(/-year-old-woman/gi,"/y/o/F");
    replace_text = replace_text.replace(/-year-old woman/gi,"/y/o/F");
    replace_text = replace_text.replace(/ yo woman/gi,"/y/o/F");

    replace_text = replace_text.replace(/ year old/gi,"/y/o");
    replace_text = replace_text.replace(/ year-old/gi,"/y/o");
    replace_text = replace_text.replace(/-year-old/gi,"/y/o");

    replace_text = replace_text.replace(/quit smoking several years ago/gi,"is an ex-smoker");
    replace_text = replace_text.replace(/quit smoking many years ago/gi,"is an ex-smoker");
    replace_text = replace_text.replace(/quit smoking years ago/gi,"is an ex-smoker");
    replace_text = replace_text.replace(/former smoker/gi,"ex-smoker");
    replace_text = replace_text.replace(/former alcoholic/gi,"ex-alcoholic");

    replace_text = replace_text.replace(/is currently a /gi,"is a ");

    replace_text = replace_text.replace(/with a past medical history significant for/gi,"w/PMH of");
    replace_text = replace_text.replace(/with past medical history significant for/gi,"w/PMH of");
    replace_text = replace_text.replace(/with a past medical history of/gi,"w/PMH of");
    replace_text = replace_text.replace(/with past medical history of/gi,"w/PMH of");
    replace_text = replace_text.replace(/with past medical history/gi,"w/PMH of");
    replace_text = replace_text.replace(/past medical history/gi,"PMH");
    replace_text = replace_text.replace(/with medical history of/gi,"w/PMH of");
    replace_text = replace_text.replace(/with medical history to include/gi,"w/PMH of");
    replace_text = replace_text.replace(/PMH that includes/gi,"PMH of");
    replace_text = replace_text.replace(/PMH to include/gi,"PMH of");
    replace_text = replace_text.replace(/PMH relevant for/gi,"PMH of");
    replace_text = replace_text.replace(/Significant PMH includes/gi,"PMH of");
    replace_text = replace_text.replace(/Significant PMH of/gi,"PMH of");
    replace_text = replace_text.replace(/PMH significant for/gi,"PMH of");
    replace_text = replace_text.replace(/Relevant PMH of/gi,"PMH of");
    replace_text = replace_text.replace(/Relevant PMH includes/gi,"PMH of");

    replace_text = replace_text.replace(/who was admitted with/gi,"admitted with");

    replace_text = replace_text.replace(/previous history of/gi,"h/o");
    replace_text = replace_text.replace(/history of/gi,"h/o");
    replace_text = replace_text.replace(/ruled out/gi,"r/o");
    replace_text = replace_text.replace(/rule out/gi,"r/o");
    replace_text = replace_text.replace(/ruling out/gi,"r/o");
    replace_text = replace_text.replace(/status post/gi,"s/p");
    replace_text = replace_text.replace(/power of attorney/gi,"POA");
    replace_text = replace_text.replace(/Do Not Resuscitate/gi,"DNR");

    replace_text = replace_text.replace(/activities of daily living/gi,"ADLs");

        //ADMIT - TRANSFER - DISCHARGE

    replace_text = replace_text.replace(/Emergency Department/gi,"ER");
    replace_text = replace_text.replace(/Emergency Room/gi,"ER");
    replace_text = replace_text.replace(/Emergency Dept./gi,"ER");
    replace_text = replace_text.replace(/Emergency Dept/gi,"ER");

    replace_text = replace_text.replace(/On arrival to ER/gi,"In the ER");
    replace_text = replace_text.replace(/On arrival to the ER/gi,"In the ER");
    replace_text = replace_text.replace(/Upon arrival to ER/gi,"In the ER");
    replace_text = replace_text.replace(/Upon arrival to the ER/gi,"In the ER");
    replace_text = replace_text.replace(/On presentation to ER/gi,"In the ER");
    replace_text = replace_text.replace(/On presentation to the ER/gi,"In the ER");
    replace_text = replace_text.replace(/Upon presentation to ER/gi,"In the ER");
    replace_text = replace_text.replace(/Upon presentation to the ER/gi,"In the ER");

    replace_text = replace_text.replace(/On arrival to ED/gi,"In the ED");
    replace_text = replace_text.replace(/On arrival to the ED/gi,"In the ED");
    replace_text = replace_text.replace(/Upon arrival to ED/gi,"In the ED");
    replace_text = replace_text.replace(/Upon arrival to the ED/gi,"In the ED");
    replace_text = replace_text.replace(/On presentation to ED/gi,"In the ED");
    replace_text = replace_text.replace(/On presentation to the ED/gi,"In the ED");
    replace_text = replace_text.replace(/Upon presentation to ED/gi,"In the ED");
    replace_text = replace_text.replace(/Upon presentation to the ED/gi,"In the ED");

    replace_text = replace_text.replace(/Upon presentation to /gi,"In the");
    replace_text = replace_text.replace(/Upon presentation to the/gi,"In the");

    replace_text = replace_text.replace(/presented to the ER/gi,"was seen in ER");
    replace_text = replace_text.replace(/presented to the ED/gi,"was seen in ED");

    replace_text = replace_text.replace(/presented to his PCP/gi,"seen by PCP");
    replace_text = replace_text.replace(/presented to her PCP/gi,"seen by PCP");
    replace_text = replace_text.replace(/presented to the clinic/gi,"seen in clinic");
    replace_text = replace_text.replace(/presented to his/gi,"seen by");
    replace_text = replace_text.replace(/presented to her/gi,"seen by");

    replace_text = replace_text.replace(/was brought to the local/gi,"was seen in local");
    replace_text = replace_text.replace(/was brought to a local/gi,"was seen in local");

    replace_text = replace_text.replace(/initial evaluation in the ER showed/gi,"In the ER, ");
    replace_text = replace_text.replace(/initial evaluation in the ED showed/gi,"In the ED, ");

    replace_text = replace_text.replace(/upon initial evaluation/gi,"");

    replace_text = replace_text.replace(/for further evaluation and management of /gi,"for");
    replace_text = replace_text.replace(/for further evaluation and treatment of /gi,"for");
    replace_text = replace_text.replace(/for further management and evaluation of /gi,"for ");
    replace_text = replace_text.replace(/for further evaluation and treatment of /gi,"for ");

    replace_text = replace_text.replace(/for further evaluation and management./gi,".");
    replace_text = replace_text.replace(/for further evaluation and treatment./gi,".");
    replace_text = replace_text.replace(/for further management and evaluation./gi,".");
    replace_text = replace_text.replace(/for further evaluation and treatment./gi,".");

    replace_text = replace_text.replace(/for further evaluation of/gi,"for");
    replace_text = replace_text.replace(/for further evaluation/gi,"");
    replace_text = replace_text.replace(/for evaluation of/gi,"for");

    replace_text = replace_text.replace(/with concerns for/gi,"for");
    replace_text = replace_text.replace(/with concerns of/gi,"for");
    replace_text = replace_text.replace(/for concerns of/gi,"for");

    replace_text = replace_text.replace(/nursing home/gi,"NH");
    replace_text = replace_text.replace(/assisted living/gi,"Asst-Lvng");
    replace_text = replace_text.replace(/skilled nursing facility/gi,"SNF");
    replace_text = replace_text.replace(/nursing facility/gi,"SNF");
    replace_text = replace_text.replace(/ambulance/gi,"ambulance");

    replace_text = replace_text.replace(/appointment/gi,"appt.");
    replace_text = replace_text.replace(/outpatient clinic/gi,"clinic");

    replace_text = replace_text.replace(/Intensive Care Unit/gi,"ICU");
    replace_text = replace_text.replace(/neuro critical care unit/gi,"NCCU");
    replace_text = replace_text.replace(/neuro critical care/gi,"NCCU");
    replace_text = replace_text.replace(/do not resuscitate/gi,"DNR");
    replace_text = replace_text.replace(/do not intubate/gi,"DNI");
    replace_text = replace_text.replace(/brought in by EMS/gi,"BIBEMS");

    replace_text = replace_text.replace(/who was admitted with/gi,"admitted for");

    replace_text = replace_text.replace(/left against medical advice/gi,"left AMA");
    replace_text = replace_text.replace(/discharged against medical advice/gi,"left AMA");

        //SPECIALTIES

    replace_text = replace_text.replace(/Orthopedic consultation/gi,"Ortho Consult");
    replace_text = replace_text.replace(/Orthopedic Surgery/gi,"Ortho.Surg.");
    replace_text = replace_text.replace(/General Surgery/gi,"G.Surg.");
    replace_text = replace_text.replace(/Medical Management/gi,"Med. Mgmt.");
    replace_text = replace_text.replace(/family doctor/gi,"PCP");
    replace_text = replace_text.replace(/family physician/gi,"PCP");
    replace_text = replace_text.replace(/Primary Care Provider/gi,"PCP");
    replace_text = replace_text.replace(/Primary Care Physician/gi,"PCP");
    replace_text = replace_text.replace(/Primary Care doctor/gi,"PCP");
    replace_text = replace_text.replace(/Primary Care doc/gi,"PCP");
    replace_text = replace_text.replace(/chemical dependency consult/gi,"CD consult");
    replace_text = replace_text.replace(/gastroenterology team/gi,"GI team");

        //MEASUREMENTS

    replace_text = replace_text.replace(/low blood pressure/gi,"hypotension");
    replace_text = replace_text.replace(/systolic blood pressure/gi,"SBP");
    replace_text = replace_text.replace(/diastolic blood pressure/gi,"DBP");
    replace_text = replace_text.replace(/systolic BP/gi,"SBP");
    replace_text = replace_text.replace(/diastolic BP/gi,"DBP")
    replace_text = replace_text.replace(/blood pressure/gi,"BP");
    replace_text = replace_text.replace(/BP of/gi,"BP");
    replace_text = replace_text.replace(/heart rate/gi,"HR");
    replace_text = replace_text.replace(/pulse rate/gi,"HR");
    replace_text = replace_text.replace(/pulse/gi,"HR");
    replace_text = replace_text.replace(/temperature elevated at/gi,"fever of");
    replace_text = replace_text.replace(/temperature elevated upto/gi,"fever upto");
    replace_text = replace_text.replace(/elevated temperature/gi,"fever");
    replace_text = replace_text.replace(/temperature elevation/gi,"fever");

    replace_text = replace_text.replace(/fever with a temperature of/gi,"fever of");
    replace_text = replace_text.replace(/fever with a temperature at/gi,"fever of");
    replace_text = replace_text.replace(/fever with temperature of/gi,"fever of");
    replace_text = replace_text.replace(/fever with temperature at/gi,"fever of");
    replace_text = replace_text.replace(/fever with his temperature of/gi,"fever of");
    replace_text = replace_text.replace(/fever with his temperature at/gi,"fever of");
    replace_text = replace_text.replace(/fever with her temperature of/gi,"fever of");
    replace_text = replace_text.replace(/fever with her temperature at/gi,"fever of");

    replace_text = replace_text.replace(/fever with a temp of/gi,"fever of");
    replace_text = replace_text.replace(/fever with a temp at/gi,"fever of");
    replace_text = replace_text.replace(/fever with temp of/gi,"fever of");
    replace_text = replace_text.replace(/fever with temp at/gi,"fever of");
    replace_text = replace_text.replace(/fever with his temp of/gi,"fever of");
    replace_text = replace_text.replace(/fever with his temp at/gi,"fever of");
    replace_text = replace_text.replace(/fever with her temp of/gi,"fever of");
    replace_text = replace_text.replace(/fever with her temp at/gi,"fever of");

    replace_text = replace_text.replace(/Vitals Upon presentation/gi,"Inital vitals");

    replace_text = replace_text.replace(/respiratory rate/gi,"RR");
    replace_text = replace_text.replace(/RR of/gi,"RR");
    replace_text = replace_text.replace(/vitals were stable/gi,"VSS");
    replace_text = replace_text.replace(/vitals stable/gi,"VSS");
    replace_text = replace_text.replace(/vital signs stable/gi,"VSS");
    replace_text = replace_text.replace(/vital signs were normal/gi,"Vitals normal");
    replace_text = replace_text.replace(/vital signs are normal/gi,"Vitals normal");
    replace_text = replace_text.replace(/vitals were normal/gi,"Vitals normal");
    replace_text = replace_text.replace(/vitals are normal/gi,"Vitals normal");
    replace_text = replace_text.replace(/vital signs/gi,"Vitals");
    replace_text = replace_text.replace(/room air/gi,"RA");
    replace_text = replace_text.replace(/oxygen saturation greater than/gi,"O2 Sats >");
    replace_text = replace_text.replace(/oxygen saturations greater than/gi,"O2 Sats >");
    replace_text = replace_text.replace(/oxygen saturation more than/gi,"O2 Sat >");
    replace_text = replace_text.replace(/oxygen saturations more than/gi,"O2 Sats >");
    replace_text = replace_text.replace(/oxygen saturation above/gi,"O2 Sat >");
    replace_text = replace_text.replace(/oxygen saturations above/gi,"O2 Sats >");
    replace_text = replace_text.replace(/oxygen saturation/gi,"O2 Sat");
    replace_text = replace_text.replace(/oxygen saturations/gi,"O2 Sats");
    replace_text = replace_text.replace(/oxygen/gi,"O2");
    replace_text = replace_text.replace(/sats above/gi,"Sats >");
    replace_text = replace_text.replace(/nasal cannula/gi,"NC");
    replace_text = replace_text.replace(/liter/gi,"L");
    replace_text = replace_text.replace(/liters/gi,"Ls");
    replace_text = replace_text.replace(/confusion/gi,"AMS");

    replace_text = replace_text.replace(/out of 10/gi,"/10");
    replace_text = replace_text.replace(/out of ten/gi,"/10");

        //KEEP ENGLISH SIMPLE STUPID :-)

    replace_text = replace_text.replace(/where he was seen after/gi,"for");
    replace_text = replace_text.replace(/where he was seen for/gi,"for");
    replace_text = replace_text.replace(/reported being/gi,"was");
    replace_text = replace_text.replace(/has not/gi,"hasn't");
    replace_text = replace_text.replace(/did show/gi,"showed");
    replace_text = replace_text.replace(/does show/gi,"shows");
    replace_text = replace_text.replace(/did receive/gi,"got");
    replace_text = replace_text.replace(/did report/gi,"had");
    replace_text = replace_text.replace(/does report/gi,"has");
    replace_text = replace_text.replace(/did take/gi,"took");
    replace_text = replace_text.replace(/does take/gi,"takes");
    replace_text = replace_text.replace(/did fall/gi,"fell");
    replace_text = replace_text.replace(/did require/gi,"required");
    replace_text = replace_text.replace(/did have/gi,"had");
    replace_text = replace_text.replace(/does have/gi,"has");
    replace_text = replace_text.replace(/did complete/gi,"completed");
    replace_text = replace_text.replace(/pretty good/gi,"good");
    replace_text = replace_text.replace(/pretty normal/gi,"normal");
    replace_text = replace_text.replace(/rather normal/gi,"normal");
    replace_text = replace_text.replace(/quite nicely/gi,"well");
    replace_text = replace_text.replace(/newly discovered/gi,"new");

    replace_text = replace_text.replace(/at this time/gi,"currently");

    replace_text = replace_text.replace(/while he was/gi,"while");
    replace_text = replace_text.replace(/while she was/gi,"while");
    replace_text = replace_text.replace(/has been given/gi,"was given");
    replace_text = replace_text.replace(/has been treated/gi,"was treated");
    replace_text = replace_text.replace(/has been given/gi,"was given");
    replace_text = replace_text.replace(/has been treated/gi,"was treated");
    replace_text = replace_text.replace(/has been having/gi,"has ongoing");
    replace_text = replace_text.replace(/was administered/gi,"was given");
    replace_text = replace_text.replace(/with concerns for/gi,"with");
    replace_text = replace_text.replace(/due to concerns for/gi,"for");
    replace_text = replace_text.replace(/for concerns of/gi,"of");
    replace_text = replace_text.replace(/secondary to/gi,"due to");
    replace_text = replace_text.replace(/underwent/gi,"had");
    replace_text = replace_text.replace(/requiring/gi,"needing");

    replace_text = replace_text.replace(/follow-up/gi,"f/u");
    replace_text = replace_text.replace(/versus/gi,"v/s");
    replace_text = replace_text.replace(/additionally had/gi,"also had");
    replace_text = replace_text.replace(/additionally has/gi,"also has");
    replace_text = replace_text.replace(/additionally endorses taking/gi,"also took");
    replace_text = replace_text.replace(/additionally endorses giving/gi,"also gave");
    replace_text = replace_text.replace(/additionally endorses having/gi,"also had");
    replace_text = replace_text.replace(/additionally endorses feeling/gi,"also felt");
    replace_text = replace_text.replace(/endorses taking/gi,"takes");
    replace_text = replace_text.replace(/endorses giving/gi,"gave");
    replace_text = replace_text.replace(/endorses having/gi,"had");
    replace_text = replace_text.replace(/endorses feeling/gi,"felt");
    replace_text = replace_text.replace(/endorses/gi,"has");
    replace_text = replace_text.replace(/endorsed/gi,"had");
    replace_text = replace_text.replace(/does not endorse/gi,"denied");

    replace_text = replace_text.replace(/is also notable for/gi,"also shows");
    replace_text = replace_text.replace(/was also notable for/gi,"also showed");
    replace_text = replace_text.replace(/is notable for/gi,"shows");
    replace_text = replace_text.replace(/was notable for/gi,"showed");
    replace_text = replace_text.replace(/notable for/gi,"showed");

    replace_text = replace_text.replace(/demonstrated features of/gi,"showed");
    replace_text = replace_text.replace(/demonstrates features of/gi,"shows");
    replace_text = replace_text.replace(/demonstrated/gi,"showed");
    replace_text = replace_text.replace(/demonstrates/gi,"shows");

    replace_text = replace_text.replace(/is unable to/gi,"can't");
    replace_text = replace_text.replace(/at that time/gi,"then");
    replace_text = replace_text.replace(/approximately/gi,"approx.");

    replace_text = replace_text.replace(/denied any symptoms of/gi,"denied");
    replace_text = replace_text.replace(/denied any/gi,"denied");
    replace_text = replace_text.replace(/no signs of/gi,"no");
    replace_text = replace_text.replace(/without any evidence of/gi,"negative for");
    replace_text = replace_text.replace(/without any signs of/gi,"without");
    replace_text = replace_text.replace(/without any sign of/gi,"without");
    replace_text = replace_text.replace(/with no evidence of/gi,"no");
    replace_text = replace_text.replace(/with no evidence for/gi,"no");

    replace_text = replace_text.replace(/without difficulty/gi,"easily");
    replace_text = replace_text.replace(/poorly controlled/gi,"uncontrolled");
    replace_text = replace_text.replace(/progressively worsening/gi,"worsening");
    replace_text = replace_text.replace(/progressive worsening/gi,"worsening");
    replace_text = replace_text.replace(/significantly worse/gi,"worse");
    replace_text = replace_text.replace(/has been progressively getting worse/gi,"has worsened");
    replace_text = replace_text.replace(/have been progressively getting worse/gi,"have worsened");
    replace_text = replace_text.replace(/became progressively worse/gi,"worsened");
    replace_text = replace_text.replace(/she has been having worsening symptoms/gi,"her symptoms have worsened");
    replace_text = replace_text.replace(/he has been having worsening symptoms/gi,"his symptoms have worsened");
    replace_text = replace_text.replace(/patient has been having worsening symptoms/gi,"Symptoms have worsened");
    replace_text = replace_text.replace(/pt. has been having worsening symptoms/gi,"Symptoms have worsened");

    replace_text = replace_text.replace(/patient continued to be quite hypoxic/gi,"Hypoxia persisted");
    replace_text = replace_text.replace(/patient continued to be quite lethargic/gi,"Lethargy persisted");
    replace_text = replace_text.replace(/patient continued to be quite confused/gi,"confusion persisted");
    replace_text = replace_text.replace(/patient continued to be quite agitated/gi,"agitation persisted");

    replace_text = replace_text.replace(/He continued to be quite hypoxic/gi,"Hypoxia persisted");
    replace_text = replace_text.replace(/He continued to be quite lethargic/gi,"Lethargy persisted");
    replace_text = replace_text.replace(/He continued to be quite confused/gi,"confusion persisted");
    replace_text = replace_text.replace(/He continued to be quite agitated/gi,"agitation persisted");

    replace_text = replace_text.replace(/She continued to be quite hypoxic/gi,"Hypoxia persisted");
    replace_text = replace_text.replace(/She continued to be quite lethargic/gi,"Lethargy persisted");
    replace_text = replace_text.replace(/She continued to be quite confused/gi,"confusion persisted");
    replace_text = replace_text.replace(/She continued to be quite agitated/gi,"agitation persisted");

    replace_text = replace_text.replace(/get worse/gi,"worsen");
    replace_text = replace_text.replace(/got worse/gi,"worsened");

    replace_text = replace_text.replace(/recurrent episodes of/gi,"recurrent");

    replace_text = replace_text.replace(/showed marked improvement of/gi,"showed much improved");
    replace_text = replace_text.replace(/showed significant improvement of/gi,"showed much improved");
    replace_text = replace_text.replace(/significant amount of/gi,"significant");

    replace_text = replace_text.replace(/over the course of/gi,"over");

    replace_text = replace_text.replace(/started becoming/gi,"got");
    replace_text = replace_text.replace(/started to become/gi,"got");

    replace_text = replace_text.replace(/has been dealing with/gi,"has had");

    replace_text = replace_text.replace(/had a Head CT that showed/gi,"Head-CT showed");
    replace_text = replace_text.replace(/had a Brain MRI that showed/gi,"Brain-MRI showed");
    replace_text = replace_text.replace(/had a CXR that showed/gi,"CXR showed");
    replace_text = replace_text.replace(/had a CXR which showed/gi,"CXR showed");
    replace_text = replace_text.replace(/had a EGD that showed/gi,"EGD showed");
    replace_text = replace_text.replace(/had a EGD which showed/gi,"EGD showed");
    replace_text = replace_text.replace(/had a colonoscopy that showed/gi,"colonoscopy showed");
    replace_text = replace_text.replace(/had a colonoscopy which showed/gi,"colonoscopy showed");
    replace_text = replace_text.replace(/had a ECHO that showed/gi,"ECHO showed");
    replace_text = replace_text.replace(/had a ECHO which showed/gi,"ECHO showed");
    replace_text = replace_text.replace(/been experiencing/gi,"been having");
    replace_text = replace_text.replace(/started experiencing/gi,"started having");
    replace_text = replace_text.replace(/began experiencing/gi,"began having");
    replace_text = replace_text.replace(/sustained a fall/gi,"fell");
    replace_text = replace_text.replace(/sustaining a fall/gi,"falling");
    replace_text = replace_text.replace(/suffered a fall/gi,"fell");
    replace_text = replace_text.replace(/suffering a fall/gi,"falling");
    replace_text = replace_text.replace(/fell to the ground/gi,"fell");
    replace_text = replace_text.replace(/suffered a fracture of/gi,"fractured");
    replace_text = replace_text.replace(/sustained a fracture of/gi,"fractured");
    replace_text = replace_text.replace(/suffered a/gi,"had a");
    replace_text = replace_text.replace(/denies hitting her head/gi,"denied head injury");
    replace_text = replace_text.replace(/denies hitting his head/gi,"denied head injury");
    replace_text = replace_text.replace(/denied hitting her head/gi,"denied head injury");
    replace_text = replace_text.replace(/denied hitting his head/gi,"denied head injury");
    replace_text = replace_text.replace(/trauma to her head/gi,"head injury");
    replace_text = replace_text.replace(/trauma to his head/gi,"head injury");

    replace_text = replace_text.replace(/was described as/gi,"was");
    replace_text = replace_text.replace(/is described as/gi,"is");

    replace_text = replace_text.replace(/ and /gi," & ");
    replace_text = replace_text.replace(/as well as/gi," & ");

    replace_text = replace_text.replace(/alleviated/gi,"eased");
    replace_text = replace_text.replace(/mitigated/gi,"eased");
    replace_text = replace_text.replace(/as soon as possible/gi,"ASAP");
    replace_text = replace_text.replace(/due to the fact that/gi,"since");
    replace_text = replace_text.replace(/since that time/gi,"since then");
    replace_text = replace_text.replace(/in light of the fact that/gi,"because");
    replace_text = replace_text.replace(/considering the fact that/gi,"because");
    replace_text = replace_text.replace(/given the fact that/gi,"because");
    replace_text = replace_text.replace(/on a daily basis/gi,"daily");
    replace_text = replace_text.replace(/on a monthly basis/gi,"monthly");
    replace_text = replace_text.replace(/on a weekly basis/gi,"weekly");
    replace_text = replace_text.replace(/on a yearly basis/gi,"annualy");
    replace_text = replace_text.replace(/on a annual basis/gi,"annualy");
    replace_text = replace_text.replace(/unknown period of time/gi,"unknown period");
    replace_text = replace_text.replace(/embolic in nature/gi,"embolic");
    replace_text = replace_text.replace(/was seen with complaints of/gi,"complained of");
    replace_text = replace_text.replace(/was found to be/gi,"was");
    replace_text = replace_text.replace(/was found to have/gi,"had");
    replace_text = replace_text.replace(/with the exception of/gi,"except");
    replace_text = replace_text.replace(/for management of/gi,"for");
    replace_text = replace_text.replace(/for the management of/gi,"for");
    replace_text = replace_text.replace(/showed changes of/gi,"showed");
    replace_text = replace_text.replace(/with findings of/gi,"with");

    replace_text = replace_text.replace(/was in his usual state of health/gi,"was doing well");
    replace_text = replace_text.replace(/was in her usual state of health/gi,"was doing well");
    replace_text = replace_text.replace(/started feeling/gi,"got");
    replace_text = replace_text.replace(/had an episode of/gi,"had");
    replace_text = replace_text.replace(/up until/gi,"until");

    replace_text = replace_text.replace(/was noted to be/gi,"was");

    replace_text = replace_text.replace(/she states that she has had/gi,"She had");
    replace_text = replace_text.replace(/he states that he has had/gi,"He had");

    replace_text = replace_text.replace(/she states that she has/gi,"She has");
    replace_text = replace_text.replace(/he states that he has/gi,"He has");

    replace_text = replace_text.replace(/Patient states that she has/gi,"She has");
    replace_text = replace_text.replace(/Patient states that he has/gi,"He has");

    replace_text = replace_text.replace(/states that she has/gi,"has");
    replace_text = replace_text.replace(/states that he has/gi,"has");

    replace_text = replace_text.replace(/patient states that/gi,"");
    replace_text = replace_text.replace(/she states that/gi,"");
    replace_text = replace_text.replace(/he states that/gi,"");

    replace_text = replace_text.replace(/patient stated that/gi,"");
    replace_text = replace_text.replace(/she stated that/gi,"");
    replace_text = replace_text.replace(/he stated that/gi,"");

    replace_text = replace_text.replace(/patient states/gi,"");
    replace_text = replace_text.replace(/she states/gi,"");
    replace_text = replace_text.replace(/he states/gi,"");

    replace_text = replace_text.replace(/she reports that she has had/gi,"She had");
    replace_text = replace_text.replace(/he reports that he has had/gi,"He had");

    replace_text = replace_text.replace(/she reports that she/gi,"She");
    replace_text = replace_text.replace(/he reports that he/gi,"He");

    replace_text = replace_text.replace(/Patient reports that she/gi,"She");
    replace_text = replace_text.replace(/Patient reports that he has/gi,"He");

    replace_text = replace_text.replace(/Patient reports pain as/gi,"Pain is");
    replace_text = replace_text.replace(/Patient reports pain is/gi,"Pain is");

    replace_text = replace_text.replace(/reports that she has/gi,"has");
    replace_text = replace_text.replace(/reports that he has/gi,"has");

    replace_text = replace_text.replace(/reports having/gi,"has");

    replace_text = replace_text.replace(/As per patient's report/gi," ");
    replace_text = replace_text.replace(/As per patient report/gi," ");
    replace_text = replace_text.replace(/As per patients report/gi," ");

    replace_text = replace_text.replace(/As per the patient she/gi,"she");
    replace_text = replace_text.replace(/As per the patient he/gi,"he");

    replace_text = replace_text.replace(/As per the patient, she/gi,"she");
    replace_text = replace_text.replace(/As per the patient, he/gi,"he");

    replace_text = replace_text.replace(/patient reports that/gi,"");
    replace_text = replace_text.replace(/she reports that/gi,"");
    replace_text = replace_text.replace(/he reports that/gi,"");

    replace_text = replace_text.replace(/patient reported that/gi,"");
    replace_text = replace_text.replace(/she reported that/gi,"");
    replace_text = replace_text.replace(/he reported that/gi,"");

    replace_text = replace_text.replace(/patient reported/gi,"");
    replace_text = replace_text.replace(/she reported/gi,"");
    replace_text = replace_text.replace(/he reported/gi,"");

    replace_text = replace_text.replace(/initially started/gi,"started");
    replace_text = replace_text.replace(/initially began/gi,"began");

    replace_text = replace_text.replace(/had a rather normal/gi,"had a normal");

    replace_text = replace_text.replace(/associated with/gi,"with");

    replace_text = replace_text.replace(/fairly quickly/gi,"rapidly");

    replace_text = replace_text.replace(/a lot better/gi,"better");
    replace_text = replace_text.replace(/unfortunately/gi,"");
    replace_text = replace_text.replace(/ultimately/gi,"");
    replace_text = replace_text.replace(/reportedly/gi,"");
    replace_text = replace_text.replace(/however/gi,"");
    replace_text = replace_text.replace(/apparently/gi,"");
    replace_text = replace_text.replace(/ongoing/gi,"");
    replace_text = replace_text.replace(/whatsoever/gi,"");

    replace_text = replace_text.replace(/what sounds like/gi,"");
    replace_text = replace_text.replace(/what sounded like/gi,"");

    replace_text = replace_text.replace(/it sounded as though/gi,"");
    replace_text = replace_text.replace(/sounded as though/gi,"");

    replace_text = replace_text.replace(/very minimal/gi,"minimal");

    replace_text = replace_text.replace(/every now and then/gi,"often");
    replace_text = replace_text.replace(/now and then/gi,"often");

    replace_text = replace_text.replace(/every now & then/gi,"often");
    replace_text = replace_text.replace(/now & then/gi,"often");

    replace_text = replace_text.replace(/to maintain/gi,"to keep");

    replace_text = replace_text.replace(/somewhat limited by/gi,"limited by");

    replace_text = replace_text.replace(/ one of the /gi,"one");

    replace_text = replace_text.replace(/after having a/gi,"after a");

    replace_text = replace_text.replace(/went away on its own/gi,"self-resolved");
    replace_text = replace_text.replace(/went away on it's own/gi,"self-resolved");

    replace_text = replace_text.replace(/management/gi,"mgmt.");

        //NUMERICAL

    replace_text = replace_text.replace(/ first /gi,"1st");
    replace_text = replace_text.replace(/ second /gi,"2nd");
    replace_text = replace_text.replace(/ third /gi,"3rd");
    replace_text = replace_text.replace(/ fourth /gi,"4th");
    replace_text = replace_text.replace(/ fifth /gi,"5th");
    replace_text = replace_text.replace(/ two /gi," 2 ");
    replace_text = replace_text.replace(/ three /gi," 3 ");
    replace_text = replace_text.replace(/ four /gi," 4 ");
    replace_text = replace_text.replace(/ five /gi,"5");
    replace_text = replace_text.replace(/ six /gi," 6 ");
    replace_text = replace_text.replace(/ seven /gi," 7 ");
    replace_text = replace_text.replace(/ eight /gi," 8 ");
    replace_text = replace_text.replace(/ nine /gi," 9 ");

    replace_text = replace_text.replace(/for 1 week/gi,"X 1 wks");
    replace_text = replace_text.replace(/for 2 weeks/gi,"X 2 wks");
    replace_text = replace_text.replace(/for 3 weeks/gi,"X 3 wks");
    replace_text = replace_text.replace(/for 4 weeks/gi,"X 4 wks");

    replace_text = replace_text.replace(/for the past week/gi,"X 1 wk.");
    replace_text = replace_text.replace(/for the past 1 week/gi,"X 1 wk.");
    replace_text = replace_text.replace(/for the past 2 weeks/gi,"X 2 wks");
    replace_text = replace_text.replace(/for the past 3 weeks/gi,"X 3 wks");
    replace_text = replace_text.replace(/for the past 4 weeks/gi,"X 4 wks");

    replace_text = replace_text.replace(/for the past 2/gi,"X 2");
    replace_text = replace_text.replace(/for the past 3/gi,"X 3");
    replace_text = replace_text.replace(/for the past 4/gi,"X 4");
    replace_text = replace_text.replace(/for the past 5/gi,"X 5");
    replace_text = replace_text.replace(/for the past 6/gi,"X 6");
    replace_text = replace_text.replace(/for the past 7/gi,"X 7");
    replace_text = replace_text.replace(/for the past 8/gi,"X 8");
    replace_text = replace_text.replace(/for the past 9/gi,"X 9");

    replace_text = replace_text.replace(/over the past/gi,"X");
    replace_text = replace_text.replace(/over the last/gi,"X");
    replace_text = replace_text.replace(/for the past/gi,"X");

    replace_text = replace_text.replace(/was less than/gi," < ");
    replace_text = replace_text.replace(/was lesser than/gi," < ");
    replace_text = replace_text.replace(/was greater than/gi," > ");
    replace_text = replace_text.replace(/is less than/gi," < ");
    replace_text = replace_text.replace(/is lesser than/gi," < ");
    replace_text = replace_text.replace(/is greater than/gi," > ");

    replace_text = replace_text.replace(/back on/gi,"on");
    return replace_text;
}

// Keep the original function for backwards compatibility
function shortifyFromInput() {
 input_text = document.getElementById('input_text').value;
    document.getElementById('input_text').value = shortify(input_text);
}

