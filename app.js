// app/main.js

// Module to control application life.
var { app, BrowserWindow } = require('electron');
const fs=require('fs');
const os=require('os');
const elec=require('electron');
const shell=elec.shell;
const ipc2=app.ipcMain;
const path = require('path');
var uns=require('unistring')
rt=uns('\u063A\u0627\u0632\u06CC\u0627\u0631').toString();
// Module to create native browser window.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {

  mainWindow = new BrowserWindow({ resizable:false,maximizable:false,frame:false,height:650,width:650, webPreferences: { nodeIntegration: true}});  // create a new window
    mainWindow.setIcon('./download.jpg')
  mainWindow.loadURL('file://' + __dirname + '/index.html');
      // Open the devtools.
      mainWindow.show();
      
      mainWindow.setMenuBarVisibility(false);
  // Create the browser window.

  mainWindow.on('closed', function () {

    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
  const { ipcMain } = require('electron');
// npm
  ipcMain.on("btnclick", function (event, arg) {
    //create new window
    



  
     if (arg=="secondparam"){
     
      var newWindow = new BrowserWindow({ width: 1280, height: 768,resizable:false , webPreferences: { nodeIntegration: true}});  // create a new window
      newWindow.setMenuBarVisibility(false);

      newWindow.loadURL('file://' + __dirname + '/new.html');
  
     newWindow.setTitle(rt);
      // Open the devtools.
      newWindow.setIcon(__dirname+'/ghazIcon.ico');
      newWindow.show();
      event.reply("btnclick-task-finished", "yes");
     }
    
     else if (arg=="login")
     {

     

     }
    
     else if (arg=="exit")
     {
      app.quit()     
     }
     else if (arg=="op")
     {
      var newWindow = new BrowserWindow({ width: 1280, height: 768 , webPreferences: { nodeIntegration: true}});  // create a new window
      newWindow.setMenuBarVisibility(false);

      newWindow.loadURL('file://' + __dirname + '/aboutUs.html');
     newWindow.setTitle(rt);
      // Open the devtools.
      newWindow.setIcon(__dirname+'/download.jpg');
      newWindow.show();
      event.sender.send("btnclick-task-finished", "yes");
     }
     else if (arg=="call")
     {
      var newWindow = new BrowserWindow({ width: 300, height: 350,maximizable: false, webPreferences: { nodeIntegration: true}});  // create a new window
      newWindow.setMenuBarVisibility(false);

      newWindow.loadURL('file://' + __dirname + '/callUs.html');
      newWindow.setTitle(rt);
      // Open the devtools.
      newWindow.setIcon(__dirname+'/download.jpg');
      newWindow.show();
      event.sender.send("btnclick-task-finished", "yes");
     }
     else if (arg=="regs")
     {
      var newWindow = new BrowserWindow({ width: 1380, height: 720 , webPreferences: { nodeIntegration: true}      });  // create a new window
      newWindow.setMenuBarVisibility(false);

      
     }
     
   

      // const PDFWindow2 = require('electron-pdf-window')

      //   const win2pdf = new PDFWindow2({
      //     width: 800,
      //     height: 600
      //   })
      
      //   win2pdf.loadURL('file://D:/withsqlite/sECTIONS/Chapter01.pdf')





    // inform the render process that the assigned task finished. Show a message in html
    // event.sender.send in ipcMain will return the reply to renderprocess

  });
  ipcMain.on("closeFaryi", function (event, arg) {
    //create new window
    mainWindow.show();
    app.quit();

    // inform the render process that the assigned task finished. Show a message in html
    // event.sender.send in ipcMain will return the reply to renderprocess
    event.sender.send("closeFaryi", "yes");
  });
  // ipcMain.on("sentforpdf", function (event, arg) {
  //   //create new window
  //   var newWindow = new BrowserWindow({ width: 1000, height: 600 , webPreferences: { nodeIntegration: true}});  // create a new window

  //   newWindow.setMenuBarVisibility(true);
    
  //   newWindow.loadURL('file://' + __dirname + '/pdf.html');
  //  newWindow.setTitle(rt);
  //   // Open the devtools.
  //   newWindow.setIcon(__dirname+'/download.jpg');
  //   newWindow.show();
  //   newWindow.webContents.on('did-finish-load', () => {
  //     newWindow.webContents.send('ping', arg)
  //   })
  // });



  




const mj = require('mjreport');




 

ipcMain.on('print-to-pdf', function (event, arg)  {
  showPrintPreview(arg);
}) 

// Dummy object array

let printWindow = null;

function showPrintPreview(arg) {
  //console.log(arg);
  var samplePersons=arg
  printWindow = new BrowserWindow({ width: 1200, height: 768 ,maximizable:false, webPreferences: { nodeIntegration: true}});
  printWindow.setMenuBarVisibility(false);
  printWindow.setIcon(__dirname+'/download.jpg');

  // Create an instance from Generator class
  let generator = new mj.Generator("چاپ تعرفه", mj.PaperType.A4_Landscape);
  generator.setStyle(`
  .header_section { position: relative;dir:rtl;margin-left:0%;text-align:center;font-family:'iranSans' } 
  .header_love { position: absolute; right: 0; top: 0; }
  .footer_text { font-size:15pt ;font-family:'iranSans';text-align:center;  }
  `);

  // Set report page header,
  generator.setHeader([
    generator.addHeading('نرم افزار غازیار', 'h3'),
    generator.addText(' چاپ تعرفه ', 'h3')
  ])

  // Set report page footer
  generator.setFooter([
    generator.addText('همراه شما در تجارت آرام، بازرگانی غازیانی', 'footer_text'),
  ])
  
  // Set report main content
  generator.setContent([
    
    generator.addTable({
      items: samplePersons,
      header:['ردیف', 'شماره فصل', 'کد تعرفه', 'شرح تعرفه', 'حقوق ورودی', 'شرح انگلیسی تعرفه'], 
        fields: function(item, opt) {
        return [ opt.row, item.session ,item.tarrifCode,item.persian_desc,item.percent,item.english_desc]
     }
    },'basic_tbl'),
    
   
    
  ]);

  // Set generated report data to global variable to use it on renderer process
  global.printData = generator.generate();


  printWindow.loadURL(path.join('file://', __dirname, '/report.html'));
  
  printWindow.on('closed', () => {
    printWindow = null;
  });

  printWindow.once('ready-to-show', () => {
    printWindow.show()
  })
}

// Generate pdf from report


ipcMain.on('saveAsPdf', (event,arg, paper) => {
  const { dialog } = require('electron')
    const savePath = dialog.showSaveDialogSync({
      filters: [{
        name: 'Adobe PDF',
        extensions: ['pdf']
      }]
    });
  const fs=require('fs');
 const win=BrowserWindow.fromWebContents(event.sender)

      // Set page size & paper orientation with paperType getSize helper method

      win.webContents.printToPDF({ marginsType: 1, ...mj.PaperType.getSize(paper) }, (err, data) => {
        if(err ) console.log('err on pdf', err)
        
        fs.writeFile(savePath, data, (err) => {
          if(err ) console.log('err on save pdf', err)
         shell.openExternal('file://'+savePath)
        })
  
  })
})

});